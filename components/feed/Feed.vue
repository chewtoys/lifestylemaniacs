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
    <v-layout v-if="paginatedArticles.length" class="py-10" justify-center align-center>
      <v-flex>
        <v-layout justify-start align-center>
          <feed-page-btn v-if="page !== 1" class="ml-0" title="Previous page" @click="onPreviousPage()">
            <v-icon>mdi-chevron-left</v-icon>
          </feed-page-btn>
        </v-layout>
      </v-flex>

      <v-flex v-if="pages" text-center subheading>
        PAGE {{ page }} OF {{ pages }}
      </v-flex>

      <v-flex>
        <v-layout justify-end align-center>
          <feed-page-btn v-if="pages > 1 && page < pages" class="mr-0" title="Next page" @click="onNextPage()">
            <v-icon>mdi-chevron-right</v-icon>
          </feed-page-btn>
        </v-layout>
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

  computed: {
    page() {
      return parseInt(this.$route.params.id, 10) || 1;
    },
    pages() {
      return Math.ceil(this.articles.length / 9);
    },
    paginatedArticles() {
      const pageNr = parseInt(this.page, 10) || 1;
      const start = (pageNr - 1) * 9;
      const stop = pageNr * 9;

      return this.articles.slice(start, stop);
    }
  },

  watch: {
    page() {
      window.scrollTo(0, 0);
    }
  },

  async fetch({ store, params }) {
    await store.dispatch('articles/getArticles', params.category);
    await store.dispatch('layout/setPageTitle', params.category ? params.category.toUpperCase() : 'LIFESTYLE MANIACS');
  },

  methods: {
    onNextPage() {
      const path = this.$route.path.includes('categories') ? `/categories/${this.$route.params.category}/page/${this.page + 1}` : `/page/${this.page + 1}`;
      this.$router.replace(path);
    },
    onPreviousPage() {
      const path = this.$route.path.includes('categories') ? `/categories/${this.$route.params.category}/page/${this.page - 1}` : `/page/${this.page - 1}`;
      this.$router.replace(path);
    },
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
  min-height: 95vh;
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
