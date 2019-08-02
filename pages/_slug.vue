<template>
  <div class="blogSelected">
    <div class="intro">
      <div class="elevate-cover">
        <div class="elevate-cover__textOffset">
          <div class="elevate-cover__left">
            <span class="blogSelected-year">
              {{ year }}
            </span>
            <h1 class="elevate-cover__title">
              {{ title }}
            </h1>
            <p class="elevate-cover__description">
              {{ description }}
            </p>
          </div>
        </div>
        <image-responsive v-if="!noMainImage" :url="`${id}/_main.jpg`" width="100%" class="elevate-cover__img" :alt="'Blog picture'" />
        <component :is="extraComponentLoader" v-else class="elevate-cover__img" />
      </div>
    </div>
    <div class="container small">
      <no-ssr>
        <DynamicMarkdown :render-func="renderFunc" :static-render-funcs="staticRenderFuncs" :extra-component="extraComponent" />
      </no-ssr>
    </div>
  </div>
</template>

<script lang="js">
export default {
  components: {
    DynamicMarkdown: () => import('~/components/markdown/DynamicMarkdown')
  },

  computed: {
    ogImage() {
      return `${process.env.baseUrl}/images/${this.id}/_thumbnail.jpg`;
    },
    pageTitle() {
      return this.title + ' – Marina Aisa';
    },
    extraComponentLoader() {
      if (!this.extraComponent) {
        return null
      }
      return () => import(`~/components/${this.extraComponent}`)
    }
  },

  async asyncData({
    params,
    app
  }) {
    const fileContent = await import(`~/contents/${params.slug}.md`);
    const attr = fileContent.attributes;
    return {
      name: params.slug,
      title: attr.title,
      trans: attr.trans,
      year: attr.year,
      id: attr.id,
      owner: attr.owner,
      colors: attr.colors,
      role: attr.role,
      cardAlt: attr.cardAlt,
      noMainImage: attr.noMainImage,
      description: attr.description,
      related: attr.related,
      extraComponent: attr.extraComponent,
      renderFunc: fileContent.vue.render,
      staticRenderFuncs: fileContent.vue.staticRenderFns,
      image: {
        main: attr.image && attr.image.main,
        og: attr.image && attr.image.og
      }
    }
  },

  head() {
    return {
      title: this.pageTitle,
      meta: [
        {
          name: 'author',
          content: 'Marina Aisa'
        },
        {
          name: 'description',
          property: 'og:description',
          content: this.description,
          hid: 'description'
        },
        {
          property: 'og:title',
          content: this.pageTitle
        },
        {
          property: 'og:image',
          content: this.ogImage
        },
        {
          name: 'twitter:description',
          content: this.description
        },
        {
          name: 'twitter:image',
          content: this.ogImage
        }
      ],
      link: [
        this.hreflang
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
