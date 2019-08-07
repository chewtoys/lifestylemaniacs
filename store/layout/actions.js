import { SET_PAGE_TITLE, TOGGLE_DRAWER } from './mutation-types';

const actions = {
  setPageTitle({ commit }, pageTitle) {
    commit({
      type: SET_PAGE_TITLE,
      pageTitle
    });
  },
  toggleDrawer({ commit }, isDrawerOpen) {
    commit({
      type: TOGGLE_DRAWER,
      isDrawerOpen
    });
  }
};

export default actions;
