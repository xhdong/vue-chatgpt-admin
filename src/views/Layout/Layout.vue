<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="sidebar.opened" @click="handleClickOutside" />
    <!-- 左侧菜单 start -->
    <side-bar />
    <!-- 左侧菜单 end -->

    <!-- 右侧主内容区 start -->
    <div class="main-container">
      <!-- 头部导航 start -->
      <nav-bar />
      <!-- 头部导航 end -->

      <!-- 导航标签 start -->
      <tags-view />
      <!-- 导航标签 end -->

      <!-- 主体内容区 start -->
      <app-main />
      <!-- 主体内容区 end -->
    </div>
    <!-- 右侧主内容区 end -->
  </div>
</template>

<script>
import SideBar from '@/components/Layout/SideBar/Index'
import NavBar from '@/components/Layout/NavBar'
import TagsView from '@/components/Layout/TagsView/Index'
import AppMain from '@/components/Layout/AppMain'

export default {
  name: 'Layout',
  components: {
    SideBar,
    NavBar,
    TagsView,
    AppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/mixin.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
