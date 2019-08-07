import { SET_PAGE_TITLE, TOGGLE_DRAWER } from './mutation-types';

const mutations = {
  [SET_PAGE_TITLE](state, payload) {
    state.pageTitle = payload.pageTitle;
  },
  [TOGGLE_DRAWER](state, payload) {
    state.drawer = payload.isDrawerOpen;
  }
};

export default mutations;
