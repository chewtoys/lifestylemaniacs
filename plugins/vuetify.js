import Vue from 'vue';
import Vuetify, {
  VApp,
  VAppBar,
  VAppBarNavIcon,
  VFlex,
  VDivider,
  VFooter,
  VContainer,
  VLayout,
  VBtn,
  VCard,
  VCardText,
  VChip,
  VListItem,
  VListItemAvatar,
  VListItemContent,
  VListItemSubtitle,
  VToolbar,
  VTextField,
  VImg,
  VSpacer,
  VCardActions
} from 'vuetify/lib';

Vue.use(Vuetify, {
  components: {
    VApp,
    VAppBar,
    VAppBarNavIcon,
    VFlex,
    VFooter,
    VDivider,
    VContainer,
    VLayout,
    VBtn,
    VCard,
    VCardText,
    VChip,
    VListItem,
    VListItemAvatar,
    VListItemContent,
    VListItemSubtitle,
    VToolbar,
    VTextField,
    VImg,
    VSpacer,
    VCardActions
  },
  iconfont: 'mdi'
});

const opts = {};

export default new Vuetify(opts);
