<template>
  <div class="sidebar-container">
    <h2 class="title-group">
      <span class="txt-title" data-after="ChatGPT 后台管理">
        <svg-icon icon-class="robot" class="icon-robot" />
      </span>
    </h2>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="$route.path"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="(route, index) in routeList"
          :key="index + route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import robot from '@/assets/icons/robot.svg'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(['sidebar']),
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    routeList() {
      return this.$router.options.routes
    }
  },
  data() {
    return {
      robot
    }
  },
  created() {
    console.log(this.permission_routes)
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.sidebar-container {
  .title-group {
    background-color: $menuBg;
    padding: 20px 0;
    .txt-title {
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $colorTextWhite;

      .icon-robot {
        width: 32px;
        height: 32px;
        padding: 5px;
        border-radius: 4px;
        background-color: $colorLink;
      }

      &:after {
        content: attr(data-after);
        line-height: 30px;
        font-size: 14px;
        padding-left: 10px;
      }
    }
  }
  .el-scrollbar {
    height: 100%;
  }
}
</style>
