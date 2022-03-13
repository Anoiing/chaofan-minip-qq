<view class="platesContainer flex">
  <!-- 背景图片 -->
  <view class="cf-bg" style="height: 100%"></view>
  <scroll-view class="platesNav nav" scroll-y scroll-with-animation scroll-top="{{vNavTop}}">
    <view
      class="cu-item {{index === activeIdx ? 'text-orange cur' : ''}}"
      qq:for="{{classicList}}"
      qq:key="index"
      bindtap="onClassicSelect"
      data-idx="{{index}}"
    >{{item.name}}</view>
  </scroll-view>
  <scroll-view
    scroll-y
    scroll-with-animation
    class="platesContent flex-sub padding-left-sm bg-white"
  >
    <view class="padding-sm">
      <view
        class="forum-item margin-right-sm margin-bottom-sm"
        qq:for="{{forumList}}"
        qq:key="index"
      >
        <button class="cu-btn shadow bg-white">
          <image
            class="margin-right-xs"
            lazy-load
            src="https://i.chao.fun/{{item.imageName}}?x-oss-process=image/format,webp/quality,q_75/resize,h_80"
          />
          {{item.name}}
        </button>
      </view>
    </view>
  </scroll-view>
  <menu-tab-bar active="1" />
</view>