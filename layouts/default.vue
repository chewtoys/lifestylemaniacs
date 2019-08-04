<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      app
    >
      <v-list nav dense>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-icon>
            <v-icon v-text="item.icon" />
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      color="primary"
      fixed
      dark
      hide-on-scroll
      app
    >
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>
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
  data() {
    return {
      drawer: false,
      items: [{
        icon: 'home',
        title: 'Home',
        to: '/'
      }
      ],
      title: 'Lifestyle Maniacs'
    }
  }
}
</script>
