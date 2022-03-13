<view class="cf-menu-tab-bar-container">
  <view class="cf-menu-tab-bar">
    <view
      class="tab-bar-item"
      qq:for="{{tabList}}"
      qq:for-index="tidx"
      qq:key="tidx"
      data-tidx="{{tidx}}"
      bindtap="onClickTab"
    >
      <view class="active-menu-ring {{active === tidx ? 'ring-active' : ''}}">
        <image src="{{active === tidx ? item.selectedIcon : item.icon}}"></image>
      </view>
    </view>
  </view>
</view>