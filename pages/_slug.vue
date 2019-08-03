<template>
  <div>
    <div>
      <p class="caption">
        {{ date }}
      </p>
      <h2 class="display-3">
        {{ title }}
      </h2>
      <v-img
        v-if="!noMainImage"
        :src="require(`@/assets/images/${id}/_main.jpg`)"
        class="my-4"
        width="100%"
        height="500px"
        :alt="'Blog picture'"
        aspect-ratio="1"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      />
    </div>
    <div>
      <vue-markdown>{{ markdown }}</vue-markdown>
    </div>
  </div>
</template>

<script lang="js">
export default {
  components: {
    VueMarkdown: () => import('vue-markdown')
  },

  computed: {
    ogImage() {
      return `${process.env.baseUrl}/images/${this.id}/_thumbnail.jpg`;
    },
    pageTitle() {
      return `${this.title} - ${this.author}`;
    }
  },

  async asyncData({ params, app }) {
    const fileContent = await import(`~/contents/${params.slug}.md`);
    const attr = fileContent.attributes;

    return {
      name: params.slug,
      title: attr.title,
      date: attr.date,
      id: attr.id,
      owner: attr.owner,
      colors: attr.colors,
      role: attr.role,
      cardAlt: attr.cardAlt,
      noMainImage: attr.noMainImage,
      description: attr.description,
      related: attr.related,
      image: {
        main: attr.image && attr.image.main,
        og: attr.image && attr.image.og
      },
      markdown: fileContent.body
    }
  },

  head() {
    return {
      title: this.pageTitle,
      meta: [{
        name: 'author',
        content: this.author || ''
      },
      {
        name: 'description',
        property: 'og:description',
        content: this.description || '',
        hid: 'description'
      },
      {
        property: 'og:title',
        content: this.pageTitle || ''
      },
      {
        property: 'og:image',
        content: this.ogImage || ''
      },
      {
        name: 'twitter:description',
        content: this.description || ''
      },
      {
        name: 'twitter:image',
        content: this.ogImage || ''
      }
      ],
      link: [
        this.hreflang || ''
      ]
    };
  },

  transition: {
    name: 'slide-fade'
  }
}
</script>

<style lang="scss">
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>
