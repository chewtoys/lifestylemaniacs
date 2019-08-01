<template>
  <v-container fluid grid-list-xl pa-2>
    <v-layout wrap>
      <v-flex
        v-for="(article, i) in paginatedArticles"
        :key="i"
        v-bind="{ [`xs${article.flex}`]: true }"
      >
        <v-card>
          <v-img
            :src="require(`@/static/articles/beachjar.jpg`)"
            class="white--text"
            height="200px"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title class="fill-height align-end" v-text="article.title" />
          </v-img>

          <v-card-text>
            <span>Number 10</span>
            <br>
            <span class="text--primary">
              <span>Whitehaven Beach</span>
              <br>
              <span>Whitsunday Island, Whitsunday Islands</span>
            </span>
          </v-card-text>

          <v-card-actions>
            <v-btn text color="primary">
              Share
            </v-btn>
            <v-btn text color="primary">
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout align-center>
      <v-flex xs3>
        <base-btn v-if="page !== 1" class="ml-0" title="Previous page" square @click="page--">
          <v-icon>mdi-chevron-left</v-icon>
        </base-btn>
      </v-flex>

      <v-flex xs6 text-xs-center subheading>
        PAGE {{ page }} OF {{ pages }}
      </v-flex>

      <v-flex xs3 text-xs-right>
        <base-btn
          v-if="pages > 1 && page < pages"
          class="mr-0"
          title="Next page"
          square
          @click="page++"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </base-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Feed',
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
      // const start = (this.page - 1) * 11;
      // const stop = this.page * 11;

      // return this.articles.slice(start, stop);
      return [...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles, ...this.articles];
    }
  },

  watch: {
    page() {
      window.scrollTo(0, 0);
    }
  }
};
</script>
