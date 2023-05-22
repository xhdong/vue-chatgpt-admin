<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
          !item.alwaysShow
      "
    >
      <el-menu-item
        v-if="onlyOneChild.meta"
        :index="resolvePath(onlyOneChild.path)"
        :class="{ 'submenu-title-noDropdown': !isNest }"
      >
        <router-link
          v-if="!sidebar.opened"
          :to="resolvePath(onlyOneChild.path)"
          class="txt-menu-link"
        >
          <el-tooltip
            effect="dark"
            :content="generateTitle(onlyOneChild.meta.title)"
            placement="right"
          >
            <i :class="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" class="icon-menu" />
          </el-tooltip>
        </router-link>
        <router-link v-else :to="resolvePath(onlyOneChild.path)" class="txt-menu-link">
          <i :class="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" class="icon-menu" />
          <span class="txt-menu">
            {{
            generateTitle(onlyOneChild.meta.title)
            }}
          </span>
        </router-link>
      </el-menu-item>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template v-if="item.meta" slot="title">
        <el-tooltip
          v-if="!sidebar.opened"
          effect="dark"
          :content="generateTitle(item.meta.title)"
          placement="right"
        >
          <i :class="item.meta && item.meta.icon" class="icon-menu" />
        </el-tooltip>
        <template v-else>
          <i :class="item.meta && item.meta.icon" class="icon-menu" />
          <span class="txt-menu">{{ generateTitle(item.meta.title) }}</span>
        </template>
      </template>
      <template v-for="(child, index) in item.children">
        <el-menu-item v-if="!child.hidden" :key="index" :index="resolvePath(child.path)">
          <router-link :to="resolvePath(child.path)" class="txt-menu-link">
            {{
            child.meta.title
            }}
          </router-link>
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { generateTitle } from '@/utils/i18n'
import { isExternal } from '@/utils/validate'

export default {
  name: 'SidebarItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      // if (showingChildren.length === 0) {
      //   this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
      //   return true
      // }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    },

    generateTitle
  }
}
</script>
