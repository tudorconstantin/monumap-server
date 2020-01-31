<template>
  <Sidebar>
    <v-app>
      <v-card
        :loading="false"
        class="mx-auto my-12"
        
        max-width="100%"
      >
        <div class="flex-row">
          <v-carousel
            :cycle="false"
            height="400"
            :show-arrows="true"
            :show-arrows-on-hover="true"
            hide-delimiter-background
          >
            <v-carousel-item
              v-for="(imageUrl, i) in monument.images"
              :key="i"
              :src="imageUrl"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
            </v-carousel-item>
          </v-carousel>
        </div>
        <v-card-title>{{ monument.denumire }}</v-card-title>
        <v-card-text>
          <v-row align="center" class="mx-0">
            <div class="grey--text ml-4">{{ monument["stare generală"] }}</div>
          </v-row>
        </v-card-text>
      </v-card>
    </v-app>
  </Sidebar>
</template>

<script>
import Sidebar from "@/components/Sidebar";
// import { mapState } from "vuex";

import { mapState } from "vuex";

export default {
  components: {
    Sidebar
  },
  created() {
    this.$store.dispatch(
      "sidebar/getMonumentImages",
      this.$store.state.sidebar.monumentShown.nr
    );
  },
  data() {
    return {};
  },
  computed: mapState({
    monument: state => {
      return state.sidebar.monumentShown;
    }
  })
};
</script>
