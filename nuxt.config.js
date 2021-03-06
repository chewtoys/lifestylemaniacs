import path from 'path';
import colors from 'vuetify/es5/util/colors';
import articles from './contents/articles.js';

const healthArticles = articles.filter(a => a.categories.includes('health'));
const healthPages = ['categories/health'];

for (let i = 1; i <= Math.ceil(healthArticles.length / 9); ++i) {
  healthPages.push(`categories/health/page/${i}`);
}

const fitnessArticles = articles.filter(a => a.categories.includes('fitness'));
const fitnessPages = ['categories/fitness'];

for (let i = 1; i <= Math.ceil(fitnessArticles.length / 9); ++i) {
  fitnessPages.push(`categories/fitness/page/${i}`);
}

const foodArticles = articles.filter(a => a.categories.includes('food'));
const foodPages = ['categories/food'];

for (let i = 1; i <= Math.ceil(foodArticles.length / 9); ++i) {
  foodPages.push(`categories/food/page/${i}`);
}

const selfDevelopmentArticles = articles.filter(a => a.categories.includes('self-development'));
const selfDevelopmentPages = ['categories/self-development'];

for (let i = 1; i <= Math.ceil(selfDevelopmentArticles.length / 9); ++i) {
  selfDevelopmentPages.push(`categories/self-development/page/${i}`);
}

const routes = [
  '404',
  ...articles.map(a => `/${a.name}`),
  ...healthPages,
  ...fitnessPages,
  ...foodPages,
  ...selfDevelopmentPages
];

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Lifestyle Maniacs',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Lifestyle Blog'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#2196f3' },
  /*
   ** Global CSS
   */
  css: ['normalize.css/normalize.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/lazyload',
    '~/plugins/vue-markdown',
    { src: '~/plugins/vuetify.js', ssr: false },
    '~/plugins/vuelidate.js'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    theme: {
      primary: colors.blue.base,
      secondary: colors.indigo.base,
      accent: colors.blue.base,
      error: colors.red.base,
      warning: colors.orange.base,
      info: colors.yellow.base,
      success: colors.green.base
    },
    treeShake: true
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map';
      }

      const rule = config.module.rules.find(r => r.test.toString() === '/\\.(png|jpe?g|gif|svg|webp)$/i');
      config.module.rules.splice(config.module.rules.indexOf(rule), 1);

      config.module.rules.push(
        {
          test: /\.md$/,
          loader: 'frontmatter-markdown-loader',
          include: path.resolve(__dirname, 'contents'),
          options: {
            vue: {
              root: 'dynamicMarkdown'
            }
          }
        },
        {
          test: /\.(jpe?g|png)$/i,
          loader: 'responsive-loader',
          options: {
            placeholder: true,
            quality: 60,
            size: 1400,
            adapter: require('responsive-loader/sharp')
          }
        },
        {
          test: /\.(gif|svg)$/,
          loader: 'url-loader',
          query: {
            limit: 1000,
            name: 'img/[name].[hash:7].[ext]'
          }
        }
      );
    }
  },

  styleResources: {
    scss: []
  },

  generate: {
    routes
  }
};
