<template>
  <v-card>
    <v-list-item>
      <v-list-item-avatar color="grey">
        <v-img :src="require('~/assets/images/IMG_20190803_103831_483.jpg')" />
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
      :src="require(`~/assets/images/${article.id}/_main.jpg`)"
      height="200px"
    />
    <v-card-text>
      <v-chip router exact :to="`/categories/${article.category.toLowerCase()}`" color="lime">
        {{ article.category }}
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
  .v-list-item__subtitle, .v-list-item__title {
    white-space: initial !important;
  }
</style>
