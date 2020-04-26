<template>
  <v-card @click.native="onReadMore">
    <v-list-item>
      <v-list-item-avatar color="grey">
        <v-img :src="require('~/static/images/IMG_20190803_103831_483.jpg')" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{ article.title }}
        </v-list-item-title>
        <v-list-item-subtitle>
          by {{ article.author }} · {{ readingTime }} min read
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-img
      :src="require(`~/static/images/${article.id}/_main.jpg`)"
      height="200px"
    />
    <v-card-text>
      <v-chip
        v-for="category of categories"
        :key="category"
        router
        exact
        :to="`/categories/${category}`"
        color="lime"
      >
        {{ category }}
      </v-chip>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="primary" @click="onReadMore">
        READ MORE
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="js">
export default {
  name: 'FeedCard',
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    categories() {
      return this.article.categories.split(',').map(c => c.trim().toLowerCase())
    },
    readingTime() {
      const contentString = JSON.stringify(this.article.markdown);
      const words = contentString.split(' ').length;
      const wordsPerMinute = 250;

      return Math.ceil(words / wordsPerMinute);
    }
  },
  methods: {
    onReadMore() {
      this.$emit('read');
    }
  }
}
</script>
<style scoped lang="scss">
  .v-card__text .v-chip {
    margin: 0 6px 0 0;
  }

  @media screen and (max-width: 599px) {
    .v-list-item__subtitle, .v-list-item__title {
      white-space: initial !important;
    }
  }
</style>
