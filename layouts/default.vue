<template>
  <v-app>
    <the-navigation-drawer />
    <the-toolbar />
    <v-content>
      <nuxt />
    </v-content>
    <the-footer />
  </v-app>
</template>

<script lang="js">
export default {
  components: {
    TheFooter: () => import('~/components/core/TheFooter'),
    TheNavigationDrawer: () => import('~/components/core/TheNavigationDrawer'),
    TheToolbar: () => import('~/components/core/TheToolbar')
  }
}
</script>
