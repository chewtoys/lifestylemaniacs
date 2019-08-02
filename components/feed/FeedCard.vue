<template>
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
  methods: {
    onReadMore() {
      this.$emit('read');
    }
  }
}
</script>
