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
        </div>
      </div>
      <div class="markdown">
        <vue-markdown>{{ article.markdown }}</vue-markdown>
      </div>
      <!-- <div class="social-content">
        <social-sharing
          url="https://vuejs.org/"
          title="The Progressive JavaScript Framework"
          description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
          quote="Vue is a progressive framework for building user interfaces."
          hashtags="vuejs,javascript,framework"
          twitter-user="vuejs"
          inline-template
        >
          <div>
            <network network="email">
              <i class="fas fa-envelope" /> Email
            </network>
            <network network="facebook">
              <i class="fas fa-facebook" /> Facebook
            </network>
            <network network="googleplus">
              <i class="fas fa-google-plus" /> Google +
            </network>
            <network network="line">
              <i class="fa fa-line" /> Line
            </network>
            <network network="linkedin">
              <i class="fa fa-linkedin" /> LinkedIn
            </network>
            <network network="odnoklassniki">
              <i class="fa fa-odnoklassniki" /> Odnoklassniki
            </network>
            <network network="pinterest">
              <i class="fa fa-pinterest" /> Pinterest
            </network>
            <network network="reddit">
              <i class="fa fa-reddit" /> Reddit
            </network>
            <network network="skype">
              <i class="fa fa-skype" /> Skype
            </network>
            <network network="sms">
              <i class="fa fa-commenting-o" /> SMS
            </network>
            <network network="telegram">
              <i class="fa fa-telegram" /> Telegram
            </network>
            <network network="twitter">
              <i class="fa fa-twitter" /> Twitter
            </network>
            <network network="vk">
              <i class="fa fa-vk" /> VKontakte
            </network>
            <network network="weibo">
              <i class="fa fa-weibo" /> Weibo
            </network>
            <network network="whatsapp">
              <i class="fa fa-whatsapp" /> Whatsapp
            </network>
          </div>
        </social-sharing>
      </div> -->
      <div class="comments">
        <div id="commento" />
        <script rel="noopener" defer async src="https://cdn.commento.io/js/commento.js" />
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
      return this.article ? require(`~/assets/images/${this.article.id}/_main.jpg`) : '';
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
      title: this.article.title,
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
        content: this.article.title
      },
      {
        property: 'og:image',
        content: this.article.image
      },
      {
        property: 'og:url',
        content: `https://www.lifestylemanicas.com/${this.article.id}`
      },
      {
        name: 'twitter:description',
        content: this.article.description
      },
      {
        name: 'twitter:image',
        content: this.article.image
      },
      {
        name: 'twitter:url',
        content: `https://www.lifestylemanicas.com/${this.article.id}`
      },
      {
        name: 'twitter:card',
        content: this.article.image
      }
      ],
      link: [
        `https://www.lifestylemanicas.com/${this.article.id}`
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

h2, h3, h4, h5, h6 {
  margin: 2rem 0 1rem 0;
}

h2 {
  font-family: "Roboto", sans-serif !important;
  font-weight: 500;
  letter-spacing: 0.0073529412em !important;
  line-height: 2.5rem;
}

.cover {
  margin: 2rem 0;
}

.markdown {
  line-height: 1.7;
  margin-bottom: 2rem;
}

.subtitle-1, .subtitle-2 {
    margin: 0 !important;
}

blockquote {
  font-size: 1.2rem;
  font-style: italic;
  font-weight: 300;
  padding: 16px 0 16px 24px;
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

  h1, .cover {
    margin: .5rem 0;
  }

  h2 {
    line-height: 2rem;
    letter-spacing: normal !important;
  }

  .v-application h1.display-2 {
    font-size: 2.25rem !important;
  }

  blockquote {
    font-size: 1.1rem;
    padding: 16px 0 16px 24px;
  }
}
</style>
