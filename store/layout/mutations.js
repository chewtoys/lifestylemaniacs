import { SET_PAGE_TITLE, TOGGLE_SIDENAV } from './mutation-types';

const mutations = {
  [SET_PAGE_TITLE](state, payload) {
    state.pageTitle = payload.pageTitle;
  },
  [TOGGLE_SIDENAV](state, payload) {
    state.isSidenavOpen = payload.isSidenavOpen;
  }
};

export default mutations;
