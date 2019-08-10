import { GET_ARTICLES, READ_ARTICLE, SEARCH_ARTICLES } from './mutation-types';

const actions = {
  async getArticles({ commit }, filter) {
    const articleNames = await import('~/contents/articles.js');
    const articles = await Promise.all(
      articleNames.default.map(async (articleName) => {
        const wholeMD = await import(`~/contents/${articleName}.md`);

        return wholeMD.default;
      })
    );

    commit({
      type: GET_ARTICLES,
      articles: articles
        .map(a => ({
          ...a.attributes,
          markdown: a.body
        }))
        .filter(a => a.category.toLowerCase().includes((filter || '').toLowerCase()))
    });
  },
  async readArticle({ commit, state, dispatch }, id) {
    if (!state.articles.length) {
      await dispatch('getArticles');
    }

    commit({
      type: READ_ARTICLE,
      id
    });
  },
  searchArticles({ commit, state }, searchQuery) {
    const searchedArticles = state.articles.filter((a) => {
      if (!searchQuery) {
        return true;
      }

      const query = searchQuery.toLowerCase().trim();
      const articleKeys = Object.keys(a);

      for (const key of articleKeys) {
        if (typeof a[key] === 'string' && a[key].toLowerCase().includes(query)) {
          return true;
        }
      }

      return false;
    });

    commit({
      type: SEARCH_ARTICLES,
      searchQuery,
      searchedArticles
    });
  }
};

export default actions;
