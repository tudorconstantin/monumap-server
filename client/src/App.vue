<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
            <router-link to="/" class="white--text">About</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-map-marker-multiple</v-icon>
          </v-list-item-action>
          <v-list-item-content>
              <router-link to="/map" class="white--text">The Monuments Map</router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Romanian Monuments</v-toolbar-title>
    </v-app-bar>

    <v-content>
            <router-view />
      
    </v-content>

    <v-footer app>
      <span>&copy; {{year}} </span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  props: {
    source: String
  },
  name: "App",

  components: {
    
  },
  data: () => ({
    drawer: false,
    year: (new Date()).getFullYear()
  }),
  created() {
    /* eslint-disable no-console */
    console.log(this.$vuetify.theme);
    this.$vuetify.theme.dark = true;
    // this.$vuetify.theme.light = true;
  }
};
</script>

<style>

</style>