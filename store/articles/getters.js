const getters = {
  article: (state) => {
    const article = {
      ...state.article.attributes,
      markdown: state.article.body
    };

    return article;
  },
  articles: state => state.articles.filter(a => a.attributes.title.toLowerCase().trim().includes(state.searchQuery.toLowerCase().trim())),
  pageTitle: state => state.pageTitle
};

export default getters;
