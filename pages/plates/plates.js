// /Users/anoiv/mySpace/chaofun/pages/plates/plates.js
Page({
  data: {
    activeIdx: 0,
    vNavTop: 0,
    classicList: [],
    forumList: []
  },
  onLoad() {
    qq.showLoading({
      title: '加载中...',
      mask: true
    });
    qq.$request({ url: 'api/v0/forum_tag/list_tags' }).then(({ data }) => {
      this.setData({ classicList: data, activeIdx: 0 });
      this.getForums(data[0].id);
    });
  },
  onReady() {
    qq.hideLoading();
  },
  // 分类选择
  onClassicSelect(e) {
    const idx = e.currentTarget.dataset.idx;
    const classId = this.data.classicList[idx].id;
    this.setData({
      activeIdx: idx,
      vNavTop: (idx - 1) * 50
    });
    this.getForums(classId);
  },
  // 获取分类下的论坛列表
  getForums(classId) {
    qq.$request({
      url: 'api/list_forums_by_tag',
      params: { tagId: classId }
    }).then(({ data }) => {
      this.setData({ forumList: data });
    });
  }
});
