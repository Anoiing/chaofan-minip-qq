// /Users/anoiv/mySpace/chaofun/pages/home/home.js
Page({
  data: {
    menuList: []
  },
  onLoad: () => {
    qq.$request({ url: '/api/get_menu' }).then((r) => {
      console.log(r);
    });
  },
  onShow: () => {
    console.log(qq);
  }
});
