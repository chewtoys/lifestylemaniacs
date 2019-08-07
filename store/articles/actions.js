import { GET_ARTICLES, READ_ARTICLE, SEARCH_ARTICLES } from './mutation-types';

const actions = {
  async getArticles({ commit }) {
    const articleNames = await import('~/contents/articles.js');
    const articles = await Promise.all(
      articleNames.default.map(async (articleName) => {
        const wholeMD = await import(`~/contents/${articleName}.md`);

        return wholeMD.default;
      })
    );

    commit({
      type: GET_ARTICLES,
      articles
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
  searchArticles({ commit }, searchQuery) {
    commit({
      type: SEARCH_ARTICLES,
      searchQuery
    });
  }
};

export default actions;
