<template>
  <v-footer padless>
    <v-card
      class="primary darken-1 white--text text-center"
      flat
      tile
    >
      <v-card-text class="white--text px-10">
        <v-layout wrap>
          <v-flex
            class="px-10"
          >
            <h3 class="my-5">
              Who am I?
            </h3>
            <p>I right Health, Fitness, Food & Cooking, and Self-development articles inspired from my personal life with the purpose of helping people improve their lives.</p>
          </v-flex>
          <!-- <v-flex
            class="px-10"
            md6
          >
            <h3 class="my-5">
              Subscribe to our Newsletter
            </h3>
            <form ref="registerForm" action="https://www.getrevue.co/profile/lifestylemaniacs/add_subscriber" method="post" target="_blank">
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                append-icon="mdi-send"
                clearable
                label="E-mail"
                prepend-inner-icon="mdi-email-outline"
                required
                solo
                @blur="$v.email.$touch()"
                @click:append="onSubmit"
                @click:clear="onClear"
                @input="$v.email.$touch()"
              />
            </form>
          </v-flex> -->
        </v-layout>
      </v-card-text>
      <v-divider dark />
      <v-card-text>
        <v-btn
          v-for="link in socialLinks"
          :key="link.url"
          :href="link.url"
          class="mx-4 white--text"
          icon
          target="_blank"
        >
          <v-icon size="24px">
            {{ link.icon }}
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text class="primary darken-2 white--text">
        &copy; 2019-{{ new Date().getFullYear() }} Lifestyle Maniacs. All rights reserved. Web app designed and coded by Razvan Tomegea using Nuxt.js.
        <v-btn
          absolute
          fab
          top
          right
          color="lime"
          @click="$vuetify.goTo(0)"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script lang="js">
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'TheFooter',
  data: () => ({
    socialLinks: [
      {
        icon: 'mdi-medium',
        url: 'https://medium.com/@RazvanTomegea'
      }, {
        icon: 'mdi-instagram',
        url: 'https://instagram.com/razvantomegea'
      }, {
        icon: 'mdi-patreon',
        url: 'https://patreon.com/razvantomegea'
      }, {
        icon: 'mdi-pinterest',
        url: 'https://pinterest.com/lifestylemaniacs'
      }, {
        icon: 'mdi-facebook',
        url: 'https://facebook.com/lifestylemaniacs'
      }
    ],
    email: ''
  }),
  computed: {
    emailErrors() {
      const errors = [];

      if (!this.$v.email.$dirty) {
        return errors;
      }

      if (!this.$v.email.required) {
        errors.push('E-mail is required');
      }

      if (!this.$v.email.email) {
        errors.push('Must be valid e-mail');
      }

      return errors
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    onClear() {
      this.$v.$reset();
      this.email = '';
    },
    onSubmit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.$refs.registerForm.submit();
      }
    }
  }
}
</script>

<style scoped lang="scss">
.v-footer .v-card {
  width: 100%;
}
</style>
