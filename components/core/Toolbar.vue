<template>
  <v-app-bar
    color="primary"
    fixed
    dark
    hide-on-scroll
    app
  >
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="toggleDrawer"
    />
    <n-link
      :to="'/'"
      exact
    >
      <v-img
        :src="require('~/assets/logo.png')"
        class="mr-5"
        contain
        height="48"
        width="48"
        max-width="48"
      />
    </n-link>
    <v-toolbar-title>
      {{ pageTitle }}
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      v-for="(link, i) in links"
      :key="i"
      :to="link.url"
      exact
      class="ml-0 hidden-sm-and-down"
      text
    >
      {{ link.title }}
    </v-btn>
    <v-text-field
      v-model="searchQuery"
      prepend-inner-icon="mdi-magnify"
      clearable
      color="primary"
      flat
      hide-details
      solo-inverted
      style="max-width: 300px;"
    />
  </v-app-bar>
</template>

<script lang="js">
import * as debounce from 'lodash/debounce';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Toolbar',
  data() {
    return {
      searchQuery: ''
    }
  },
  computed: {
    ...mapGetters({
      links: 'layout/links',
      pageTitle: 'layout/pageTitle'
    })
  },
  watch: {
    searchQuery: debounce(function (val) {
      // TODO: Query parameters
      this.$router.replace('/');

      setTimeout(() => {
        this.searchArticles(val);
      }, 100);
    }, 1000)
  },
  methods: {
    ...mapActions({
      searchArticles: 'articles/searchArticles',
      toggleDrawer: 'layout/toggleDrawer'
    })
  }
}
</script>

<style scoped lang="scss">
</style>
