// /Users/anoiv/mySpace/chaofun/pages/home/home.js
const orderList = [
  { n: '最新', v: 'new' },
  { n: '最热', v: 'hot' },
  { n: '新评', v: 'comment' }
];
const timeRange = [
  { n: '当前最赞', v: '1hour' },
  { n: '日最赞', v: '1day' },
  { n: '周最赞', v: '1week' },
  { n: '月最赞', v: '1month' },
  { n: '年最赞', v: '1year' },
  { n: '总最赞', v: 'all' }
];
Page({
  data: {
    statusBarHeight: 0,
    navHeight: 44,
    menuActive: 0,
    orderActive: 0,
    rangeActive: 0,
    menuList: [],
    orderList,
    timeRange
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
  // 类型修改（全局菜单）
  onClassicSelect(e) {
    const idx = e.currentTarget.dataset.idx;
    this.setData({ menuActive: idx }, () => this.getCombineList());
  },
  // 排序方式修改（最新/最热/新评/最赞）
  onOrderSelect(e) {
    const idx = e.currentTarget.dataset.idx;
    console.log(idx);
    this.setData({ orderActive: idx }, () => this.getCombineList());
  },
  // 最赞时间范围修改
  onTimeRangeChange(e) {
    const idx = Number(e.detail.value);
    this.setData({ rangeActive: idx, orderActive: 3 }, () =>
      this.getCombineList()
    );
  },
  // 获取综合列表
  getCombineList() {
    const {
      orderActive,
      rangeActive,
      menuActive,
      orderList,
      timeRange,
      menuList
    } = this.data;
    const order = orderList[orderActive]?.v || 'ups';
    const range = timeRange[rangeActive].v;
    const forumId = menuList[menuActive].forumId;
    qq.$request({
      url: '/api/v0/list_combine',
      params: { order, range, forumId, pageSize: 20 }
    }).then(({ data }) => {
      console.log(data, 'CombineList');
    });
  }
});
