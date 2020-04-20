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

    <n-link to="/" prefetch>
      <v-toolbar-title>LM</v-toolbar-title>
    </n-link>

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
      class="search-bar"
      clearable
      color="primary"
      flat
      hide-details
      solo-inverted
    />
  </v-app-bar>
</template>

<script lang="js">
import * as debounce from 'lodash/debounce';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TheToolbar',
  data: () => ({
    searchQuery: ''
  }),
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
.v-application a {
    color: white;
    text-decoration: none;
}

.v-toolbar__title {
  padding: 0 24px 0 12px;
}

.search-bar {
  margin: 0 0 0 16px !important;
  max-width: 316px;
}
</style>
