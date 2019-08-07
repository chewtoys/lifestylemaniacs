<template>
  <v-app>
    <navigation-drawer />
    <toolbar />
    <v-content>
      <nuxt />
    </v-content>
    <v-footer absolute app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script lang="js">
export default {
  components: {
    NavigationDrawer: () => import('~/components/core/NavigationDrawer'),
    Toolbar: () => import('~/components/core/Toolbar')
  }
}
</script>
