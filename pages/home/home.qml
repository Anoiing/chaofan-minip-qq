<view>
  <view style="height: {{statusBarHeight}}px;line-height: {{statusBarHeight}}px;background-color: #fff"></view>
  <view class="cu-bar search bg-white solid-bottom" style="height: {{navHeight}}px">
    <view class="cu-avatar" style="background-color: #fff;background-image:url(../../assets/home.png);"></view>
    <view class="search-form round">
      <text class="cuIcon-search"></text>
      <input type="text" placeholder="搜索图片、文章、视频" confirm-type="search"></input>
    </view>
    <view style="padding-right: 92px">
    </view>
  </view>
  <scroll-view scroll-x scroll-with-animation class="homeMenuBar bg-white">
    <view
      class="cu-item padding-left padding-right {{index === menuActiveIdx ? 'text-orange cur' : ''}}"
      qq:for="{{menuList}}"
      qq:key="index"
      bindtap="onClassicSelect"
      data-idx="{{index}}"
    >{{item.title}}</view>
  </scroll-view>
</view>