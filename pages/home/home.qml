<view>
  <view
    style="height: {{statusBarHeight}}px;line-height: {{statusBarHeight}}px;background-color: #fff"
  ></view>
  <view class="cu-bar search bg-white solid-bottom" style="height: {{navHeight}}px">
    <view
      class="cu-avatar"
      style="background-color: #fff;background-image:url(../../assets/home.png);"
    ></view>
    <view class="search-form round">
      <text class="cuIcon-search"></text>
      <input type="text" placeholder="搜索图片、文章、视频" confirm-type="search" />
    </view>
    <view style="padding-right: 92px"></view>
  </view>
  <scroll-view scroll-x scroll-with-animation class="homeMenuBar bg-white nav">
    <view
      class="menu-item padding-left padding-right {{index === menuActive ? 'active' : ''}}"
      qq:for="{{menuList}}"
      qq:key="index"
      data-idx="{{index}}"
      bindtap="onClassicSelect"
    >{{item.title}}</view>
  </scroll-view>
  <view class="list-order">
    <view
      class="list-order-item {{idx === orderActive ? 'active' : ''}}"
      qq:for="{{orderList}}"
      qq:for-index="idx"
      qq:key="idx"
      data-idx="{{idx}}"
      bindtap="onOrderSelect"
    >{{item.n}}</view>
    <picker
      mode="selector"
      class="time-range-picker"
      value="{{rangeActive}}"
      range="{{timeRange}}"
      range-key="n"
      bindchange="onTimeRangeChange"
    >
      <view class="list-order-item {{orderActive === 3 ? 'active' : ''}}">
        最赞
        <view class="time-range">{{orderActive === 3 ? '· ' + timeRange[rangeActive].n : '' }}</view>
      </view>
    </picker>
  </view>

  <post-card />
</view>