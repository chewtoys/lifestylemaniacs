<script lang="js">
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/a11y-light.css';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('xml', xml);

export default {
  components: {
    InlineCode: () => import('./InlineCode')
  },
  props: {
    renderFunc: {
      type: String,
      default: null
    },
    staticRenderFuncs: {
      type: String,
      default: null
    },
    extraComponent: {
      type: String,
      default: ''
    }
  },

  computed: {
    extraComponentLoader() {
      if (!this.extraComponent) {
        return null
      }
      return () => import(`~/components/${this.extraComponent}`)
    }
  },

  mounted() {
    const targets = document.querySelectorAll('code');

    targets.forEach((target) => {
      hljs.highlightBlock(target)
    });
  },

  created() {
    this.templateRender = new Function(this.renderFunc)()
    this.$options.staticRenderFns = new Function(this.staticRenderFuncs)()
  },

  render(createElement) {
    return this.templateRender ? this.templateRender() : createElement('div', 'Rendering');
  }
}
</script>
