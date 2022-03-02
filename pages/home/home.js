// /Users/anoiv/mySpace/chaofun/pages/home/home.js
Page({
  data: {
    statusBarHeight: 0,
    navHeight: 44,
    menuActiveIdx: 0,
    menuList: []
  },
  onLoad() {
    qq.showLoading({
      title: '加载中...',
      mask: true
    });
    // 计算自定义菜单条高度
    const _menuInfo = qq.getMenuButtonBoundingClientRect();
    const _systemInfo = qq.getSystemInfoSync();
    const navHeight =
      (_menuInfo.top - _systemInfo.statusBarHeight) * 2 + _menuInfo.height;
    this.setData({ statusBarHeight: _systemInfo.statusBarHeight, navHeight });
    // 请求菜单数据
    qq.$request({ url: '/api/get_menu' }).then(({ data }) => {
      let menuList = [];
      data.forEach((o) => (menuList = menuList.concat(o.menues)));
      this.setData({ menuList });
    });
  },
  onShow() {},
  onReady() {
    qq.hideLoading();
  },
  onClassicSelect(e) {
    const idx = e.currentTarget.dataset.idx;
    const classId = this.data.menuList[idx].id;
    this.setData({
      menuActiveIdx: idx
    });
    // this.getForums(classId);
  }
});
