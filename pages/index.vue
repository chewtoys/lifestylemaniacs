<template>
  <feed :articles="articles" />
</template>

<script lang="js">
import { mapGetters } from 'vuex';

export default {
  components: {
    Feed: () => import('~/components/feed/Feed')
  },

  computed: {
    ...mapGetters({
      articles: 'articles/articles'
    })
  },

  async fetch({ store, params }) {
    await store.dispatch('articles/getArticles');
    await store.dispatch('layout/setPageTitle', 'Lifestyle Avengers');
  },

  transition: {
    name: 'slide-fade'
  }
};
</script>

<style lang="scss">
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all .4s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>
