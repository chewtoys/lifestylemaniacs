const getters = {
  article: state => ({
    ...state.article.attributes,
    markdown: state.article.body
  }),
  articles: state =>
    state.articles
      .map(a => ({
        ...a.attributes,
        markdown: a.body
      }))
      .filter(a =>
        a.title
          .toLowerCase()
          .trim()
          .includes(state.searchQuery.toLowerCase().trim())
      )
};

export default getters;
