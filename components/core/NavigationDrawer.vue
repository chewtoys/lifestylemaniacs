<template>
  <v-navigation-drawer v-model="drawer" fixed temporary app>
    <v-list nav dense>
      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        :to="link.url"
        router
        exact
      >
        <v-list-item-icon>
          <v-icon v-text="link.icon" />
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="link.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="js">
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'NavigationDrawer',
  computed: {
    ...mapGetters({
      links: 'layout/links'
    }),
    drawer: {
      get() {
        return this.$store.state.layout.drawer
      },
      set(val) {
        this.toggleDrawer(val)
      }
    }
  },
  methods: {
    ...mapActions({
      toggleDrawer: 'layout/toggleDrawer'
    })
  }
}
</script>
