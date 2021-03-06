<template>
  <v-container fluid>
    <div class="article__content">
      <div>
        <h1 class="display-2 font-weight-light">
          {{ article.title }}
        </h1>
        <p class="subtitle-2">
          by {{ article.author }}
        </p>
        <span class="body-2">
          Created on {{ article.createdOn }}
        </span>
        <p class="caption">
          {{ readingTime }} min read
        </p>
        <div class="cover">
          <v-img
            v-if="!article.noMainImage"
            :src="image"
            class="my-5"
            width="100%"
            height="500px"
            :alt="'Blog picture'"
            aspect-ratio="1"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          />
          <a
            v-if="article.imageCredit && article.imageCreditUrl"
            :href="article.imageCreditUrl"
            class="caption text-center"
            target="_blank"
          >{{ article.imageCredit }}</a>
        </div>
      </div>
      <div class="markdown">
        <vue-markdown>{{ article.markdown }}</vue-markdown>
      </div>
    </div>
  </v-container>
</template>

<script lang="js">
import { mapGetters } from 'vuex';

export default {
  components: {
    VueMarkdown: () => import('vue-markdown')
  },

  computed: {
    ...mapGetters({
      article: 'articles/article'
    }),
    image() {
      return require(`~/static/images/${this.article.id}/_main.jpg`);
    },
    imageSrc() {
      return `~/static/images/${this.article.id}/_main.jpg`;
    },
    link() {
      return `https://www.lifestylemanicas.com/${this.article.id}`;
    },
    pageTitle() {
      return `${this.article.title} - ${this.article.author}`;
    },
    readingTime() {
      const contentString = JSON.stringify(this.article.markdown);
      const words = contentString.split(' ').length;
      const wordsPerMinute = 250;

      return Math.ceil(words / wordsPerMinute);
    }
  },

  async fetch({ store, params }) {
    await store.dispatch('articles/readArticle', params.slug);
    await store.dispatch('layout/setPageTitle', store.state.articles.article.title);
  },

  head() {
    return {
      title: this.pageTitle,
      meta: [{
        name: 'author',
        content: this.article.author
      },
      {
        name: 'description',
        property: 'og:description',
        content: this.article.description,
        hid: 'description'
      },
      {
        property: 'og:title',
        content: this.pageTitle
      },
      {
        property: 'og:image',
        content: this.imageSrc
      },
      {
        property: 'og:url',
        content: this.link
      },
      {
        name: 'twitter:description',
        content: this.article.description
      },
      {
        name: 'twitter:image',
        content: this.imageSrc
      },
      {
        name: 'twitter:url',
        content: this.link
      },
      {
        name: 'twitter:card',
        content: this.imageSrc
      }
      ],
      link: [
        this.link
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
  font-size: 1.1rem;
  padding: 0 27%;
}

h1 {
  margin: 1rem 0;
}

h2,
h3,
h4,
h5,
h6 {
  margin: 2rem 0 1rem 0;
}

h2 {
  font-family: 'Roboto', sans-serif !important;
  font-weight: 500;
  letter-spacing: 0.0073529412em !important;
  line-height: 2.5rem;
}

.cover {
  margin: 2rem 0 1rem 0;
  text-align: center;
}

.social-content {
  display: flex;
  flex-flow: row wrap;
  margin: 0 0 24px 0;
}

.markdown {
  line-height: 1.7;
  margin-bottom: 2rem;

  h1 {
    font-family: 'Roboto', sans-serif !important;
    font-weight: 500 !important;
    letter-spacing: 0.0073529412em !important;
    line-height: 2.5rem !important;
    margin: 2rem 0 1rem 0 !important;
  }
}

.subtitle-1,
.subtitle-2 {
  margin: 0 !important;
}

blockquote {
  font-size: 1.2rem;
  font-style: italic;
  font-weight: 300;
  padding: 16px 0 16px 24px;
}

thead tr:last-child th, tbody tr td {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  padding: 8px 16px;
  text-align: center;
}

@media screen and (max-width: 1299px) {
  .article__content {
    padding: 0 20%;
  }
}

@media screen and (max-width: 1099px) {
  .article__content {
    padding: 0 15%;
  }
}

@media screen and (max-width: 899px) {
  .article__content {
    padding: 0 10%;
  }
}

@media screen and (max-width: 599px) {
  .article__content {
    font-size: 1rem;
    padding: 0 4%;
  }

  h1,
  .cover {
    margin: 0.5rem 0;
  }

  .markdown h1, .markdown h2 {
    line-height: 2rem;
    letter-spacing: normal !important;
  }

  .v-application h1.display-2 {
    font-size: 2.25rem !important;
    line-height: 2.65rem !important;
  }

  blockquote {
    font-size: 1.1rem;
    padding: 16px 0 16px 24px;
  }
}
</style>
