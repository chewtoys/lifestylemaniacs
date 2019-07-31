<template>
  <feed :articles="articles" />
</template>

<script>
import articleNames from '~/contents/articles.js';

export default {
  components: {
    Feed: () => import('@/components/Feed')
  },

  async asyncData({ params }) {
    const articles = await Promise.all(
      articleNames.map(async (articleName) => {
        const wholeMD = await import(`~/contents/${articleName}.md`);

        return wholeMD.attributes;
      })
    );

    console.log(articles);

    return { articles };
  }
};
</script>
