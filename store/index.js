export const state = () => ({
  articles: require('@/static/articles.json'),
  drawer: false,
  items: [
    {
      text: 'Home',
      to: '/'
    },
    {
      text: 'About',
      href: '#about'
    }
  ]
})

export const getters = {
  links: (state, getters) => {
    return state.items.concat(getters.categories)
  }
}

export const mutations = {
  setDrawer: (state, payload) => (state.drawer = payload),
  toggleDrawer: state => (state.drawer = !state.drawer)
}
