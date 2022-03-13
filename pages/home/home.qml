<view>
  <!-- 背景图片 -->
  <view class="cf-bg" style="height: 100%"></view>
  <!-- 给手机信息栏预留的高度 -->
  <view
    style="height: {{statusBarHeight}}px;line-height: {{statusBarHeight}}px;background-color: transparent;color: #fff"
  ></view>
  <!-- 搜索栏 -->
  <view class="searcher" style="height: {{navHeight}}px">
    <view class="searcher-icon">
      <icon class="cficon cficon-search" />
    </view>
    <view class="searcher-input">
      <input type="text" placeholder="搜点什么" confirm-type="search" />
    </view>
  </view>
  <view class="category-menu">
    <scroll-view scroll-x scroll-with-animation class="category-menu-menus">
      <view
        class="category-menu-item {{index === menuActive ? 'active' : ''}}"
        qq:for="{{menuList}}"
        qq:key="index"
        data-idx="{{index}}"
        bindtap="onClassicSelect"
      >{{item.title}}</view>
    </scroll-view>
    <view class="category-menu-filter" bindtap="onToggleFilter">
      <icon class="cficon cficon-filter" />
    </view>
  </view>
  <view class="menu-filter" qq:if="{{orderVisible}}">
    <view
      class="menu-filter-item {{idx === orderActive ? 'active' : ''}}"
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
      <view class="menu-filter-item {{orderActive === 3 ? 'active' : ''}}">
      最赞
      <view class="time-range">{{orderActive === 3 ? ' · ' + timeRange[rangeActive].n : '' }}</view>
      </view>
    </picker>
  </view>
  <scroll-view scroll-y class="list-container" >
    <post-card
      qq:for="{{combineList}}"
      qq:for-index="idx"
      qq:key="idx"
      data="{{item}}"
    />
  </scroll-view>
</view>