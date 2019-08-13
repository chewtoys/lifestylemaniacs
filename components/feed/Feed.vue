<template>
  <v-container fluid grid-list-md :class="!paginatedArticles.length ? 'fill-height' : ''">
    <v-layout v-if="paginatedArticles.length" wrap>
      <v-flex
        v-for="(article, i) in paginatedArticles"
        :key="i"
        auto
        md4
        sm6
        xs12
      >
        <feed-card :article="article" @read="onReadArticle(article)" />
      </v-flex>
    </v-layout>
    <v-layout v-if="paginatedArticles.length" wrap align-center>
      <v-flex xs3>
        <feed-page-btn v-if="page !== 1" class="ml-0" title="Previous page" square @click="page--">
          <v-icon>mdi-chevron-left</v-icon>
        </feed-page-btn>
      </v-flex>

      <v-flex v-if="pages" xs6 text-center subheading>
        PAGE {{ page }} OF {{ pages }}
      </v-flex>

      <v-flex xs3 text-xs-right>
        <feed-page-btn v-if="pages > 1 && page < pages" class="mr-0" title="Next page" square @click="page++">
          <v-icon>mdi-chevron-right</v-icon>
        </feed-page-btn>
      </v-flex>
    </v-layout>
    <v-layout v-if="!paginatedArticles.length" align-center class="fill-height" justify-center>
      <v-flex text-center>
        <h1 class="font-weight-light grey--text">
          No results found
        </h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="js">
export default {
  name: 'Feed',
  components: {
    FeedCard: () => import('./FeedCard'),
    FeedPageBtn: () => import('./FeedPageBtn')
  },
  props: {
    articles: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    layout: [2, 2, 1, 2, 2, 3, 3, 3, 3, 3, 3],
    page: 1
  }),

  computed: {
    pages() {
      return Math.ceil(this.articles.length / 11);
    },
    paginatedArticles() {
      const start = (this.page - 1) * 11;
      const stop = this.page * 11;

      return this.articles.slice(start, stop);
    }
  },

  watch: {
    page() {
      window.scrollTo(0, 0);
    }
  },

  methods: {
    onReadArticle(article) {
      this.$router.push(`/${article.id}`);
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  padding: 2rem 10rem;
}

.fill-height {
  height: 100%;
  min-height: 90vh;
}

@media screen and (max-width: 1299px) {
  .container {
    padding: 2rem 6rem;
  }
}

@media screen and (max-width: 899px) {
  .container {
    padding: 1rem 2rem;
  }
}

@media screen and (max-width: 599px) {
  .container {
    padding: .5rem;
  }
}
</style>
