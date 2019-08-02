<template>
  <v-container fluid grid-list-xl pa-2>
    <v-layout wrap>
      <v-flex
        v-for="(article, i) in paginatedArticles"
        :key="i"
        v-bind="{ [`xs${article.flex}`]: true }"
      >
        <feed-card :article="article" @read="onReadArticle(article)" />
      </v-flex>
    </v-layout>
    <v-layout align-center>
      <v-flex xs3>
        <feed-page-btn v-if="page !== 1" class="ml-0" title="Previous page" square @click="page--">
          <v-icon>chevron_left</v-icon>
        </feed-page-btn>
      </v-flex>

      <v-flex xs6 text-xs-center subheading>
        PAGE {{ page }} OF {{ pages }}
      </v-flex>

      <v-flex xs3 text-xs-right>
        <feed-page-btn
          v-if="pages > 1 && page < pages"
          class="mr-0"
          title="Next page"
          square
          @click="page++"
        >
          <v-icon>chevron_right</v-icon>
        </feed-page-btn>
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
      return Math.ceil([...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles].length / 11);
    },
    paginatedArticles() {
      const start = (this.page - 1) * 11;
      const stop = this.page * 11;

      // return this.articles.slice(start, stop);
      return [...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles].slice(start, stop);
    }
  },

  watch: {
    page() {
      window.scrollTo(0, 0);
    }
  },

  methods: {
    onReadArticle(article) {
      this.$router.push(article.name);
    }
  }
};
</script>
