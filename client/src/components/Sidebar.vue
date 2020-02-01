<template>
  <v-app>
    <portal v-if="isPanelOpen">
      <v-content>
        <v-container fluid>
          <div @click="closeSidebarPanel">
            <v-overlay :value="isPanelOpen" :z-index="0">
              <transition name="slide">
                <v-sheet
                  class="sidebar-panel"
                  :class="{ 'full-width': $vuetify.breakpoint.smAndDown }"
                  v-on:click.stop="ignoreClick"
                >
                  <v-spacer></v-spacer>
                  <div width="100%" class="flex-row-reverse">
                  <v-icon @click="closeSidebarPanel">mdi-close</v-icon>
                  </div>
                  <slot></slot>
                </v-sheet>
              </transition>
            </v-overlay>
          </div>
        </v-container>
      </v-content>
    </portal>
  </v-app>
</template>
<script>
import { mapState } from "vuex";

export default {
  created() {
    // this.$store.commit("sidebar/toggleNav");
    // eslint-disable-next-line no-console
    console.log(`closing`, this.$store.state.sidebar.isNavOpen);
  },
  methods: {
    closeSidebarPanel: function(event) {
      // eslint-disable-next-line no-console
      console.log(`ev`, event, this);
      this.$store.commit("sidebar/closeNav");
    },
    ignoreClick() {}
  },
  computed: mapState({
    isPanelOpen: state => {
      return state.sidebar.isNavOpen;
    },
    monument: state => state.sidebar.monument
  })
};
</script>
<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
  transition: all 150ms ease-in 0s;
}

.sidebar-backdrop {
  background-color: rgba(19, 15, 64, 0.4);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
}

.sidebar-panel {
  overflow-y: auto;
  background-color: #f8f7fc;
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  /* z-index: 999; */
  padding: 3rem 20px 2rem 20px;
  /* width: 300px; */
  width: 50%;
  min-width: 50%;
  z-index: 1;
}

.full-width {
  width: 100%;
}
</style>
