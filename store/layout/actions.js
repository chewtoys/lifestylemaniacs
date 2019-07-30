import { SET_PAGE_TITLE, TOGGLE_SIDENAV } from './mutation-types';

const actions = {
  setPageTitle({ commit }, pageTitle) {
    commit({
      type: SET_PAGE_TITLE,
      pageTitle
    });
  },
  toggleSidenav({ commit }, isSidenavOpen) {
    commit({
      type: TOGGLE_SIDENAV,
      isSidenavOpen
    });
  }
};

export default actions;
