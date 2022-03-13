Component({
  properties: {
    active: {
      type: Number,
      value: 0
    }
  },
  data: {
    tabList: [
      {
        path: '/pages/home/home',
        icon: '../../assets/tabicons/home_h.png',
        selectedIcon: '../../assets/tabicons/home.png'
      },
      {
        path: '/pages/plates/plates',
        icon: '../../assets/tabicons/plates_h.png',
        selectedIcon: '../../assets/tabicons/plates.png'
      },
      {
        path: '/pages/publish/publish',
        icon: '../../assets/tabicons/publish_h.png',
        selectedIcon: '../../assets/tabicons/publish.png'
      },
      {
        path: '/pages/message/message',
        icon: '../../assets/tabicons/message_h.png',
        selectedIcon: '../../assets/tabicons/message.png'
      },
      {
        path: '/pages/me/me',
        icon: '../../assets/tabicons/me_h.png',
        selectedIcon: '../../assets/tabicons/me.png'
      }
    ]
  },
  methods: {
    onClickTab(e) {
      const tidx = e.currentTarget.dataset.tidx;
      qq.navigateTo({ url: this.data.tabList[tidx].path });
    }
  }
});
