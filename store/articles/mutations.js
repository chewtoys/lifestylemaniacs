import { GET_ARTICLES, READ_ARTICLE, SEARCH_ARTICLES } from './mutation-types';

const mutations = {
  [GET_ARTICLES](state, payload) {
    state.articles = payload.articles;
    state.searchedArticles = payload.articles;
  },
  [READ_ARTICLE](state, payload) {
    state.article = state.articles.find(a => a.id === payload.id) || {};
  },
  [SEARCH_ARTICLES](state, payload) {
    state.searchQuery = payload.searchQuery;
    state.searchedArticles = payload.searchedArticles;
  }
};

export default mutations;
