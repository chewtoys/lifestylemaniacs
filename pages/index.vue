<template>
  <feed :articles="articles" />
</template>

<script lang="js">
import articleNames from '~/contents/articles.js';

export default {
  components: {
    Feed: () => import('@/components/feed/Feed')
  },

  async asyncData({ params }) {
    const articles = await Promise.all(
      articleNames.map(async (articleName) => {
        const wholeMD = await import(`~/contents/${articleName}.md`);

        return wholeMD.attributes;
      })
    );

    return { articles };
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
