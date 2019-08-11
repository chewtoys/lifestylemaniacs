<template>
  <v-footer padless>
    <v-card
      flat
      tile
      class="primary darken-1 white--text text-center"
    >
      <v-card-text class="white--text px-10">
        <v-layout wrap>
          <v-flex
            class="px-10"
            md6
          >
            <h3 class="my-5">
              Who are we?
            </h3>
            <p>We are a community dedicated to making an impact on peoples' lives through the power of habit and lifestyle. We right short and concise articles every week, sharing practical knowledge that every person can apply now.</p>
          </v-flex>
          <v-flex
            class="px-10"
            md6
          >
            <h3 class="my-5">
              Subscribe to Newsletter
            </h3>
            <v-text-field
              label="Email"
              solo
              clearable
              prepend-inner-icon="mdi-email-outline"
            />
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-divider dark />
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text class="primary darken-2 white--text">
        &copy; {{ new Date().getFullYear() }} Lifestyle Maniacs. All rights reserved. Web app designed and coded by Razvan Tomegea using Nuxt.js.
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
export default {
  name: 'TheFooter',
  data: () => ({
    icons: [
      'fab fa-facebook',
      'fab fa-twitter',
      'fab fa-google-plus',
      'fab fa-linkedin',
      'fab fa-instagram'
    ]
  })
}
</script>
