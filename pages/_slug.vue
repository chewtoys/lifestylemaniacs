<template>
  <div class="article__content">
    <div>
      <h1 class="display-3 hidden-xs-only">
        {{ title }}
      </h1>
      <h1 class="display-2 hidden-sm-and-up">
        {{ title }}
      </h1>
      <p class="subtitle-1">
        Written by {{ author }}
      </p>
      <p class="subtitle-2">
        Created on {{ date }}
      </p>
      <p class="caption">
        4 min read
      </p>
      <div class="cover">
        <v-img
          v-if="!noMainImage"
          :src="require(`@/assets/images/${id}/_main.jpg`)"
          class="my-5"
          width="100%"
          height="500px"
          :alt="'Blog picture'"
          aspect-ratio="1"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        />
      </div>
    </div>
    <div class="markdown">
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
      author: attr.author,
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

.article__content {
  padding: 0 22rem;
}

h1 {
  margin: 2rem 0 1rem 0;
}

h2, h3, h4, h5, h6 {
  margin: 2rem 0;
}

.cover {
  margin: 2rem 0;
}

.markdown {
  font-size: 19px;
  line-height: 1.7;
}

.subtitle-1, .subtitle-2 {
    margin: 0 !important;
}

blockquote {
  padding: 16px 0 16px 24px;
  font-size: 18px;
  font-style: italic;
  font-weight: 300;
}

@media screen and (max-width: 1299px) {
  .article__content {
    padding: 0 11rem;
  }
}

@media screen and (max-width: 1099px) {
  .article__content {
    padding: 0 5rem;
  }
}

@media screen and (max-width: 899px) {
  .article__content {
    padding: 0 1rem;
  }

  h1.display-3 {
    font-size: 3rem !important;
  }
}

@media screen and (max-width: 599px) {
  .article__content {
    padding: 0;
  }

  h1, .cover {
    margin: .5rem 0;
  }

  .markdown {
    font-size: 16px;
  }
}
</style>
