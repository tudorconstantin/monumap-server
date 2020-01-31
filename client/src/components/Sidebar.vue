<template>
  <portal v-if="isPanelOpen">
    <div @click="closeSidebarPanel">
      <v-overlay :value="isPanelOpen" :z-index="0">
        <v-sheet elevation="12">
          <transition name="slide">
            <div class="sidebar-panel" v-on:click.stop="ignoreClick">
              <slot></slot>
            </div>
          </transition>
        </v-sheet>
      </v-overlay>
    </div>
  </portal>
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
    ignoreClick() {
    }
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
  z-index: 1;
}
</style>
