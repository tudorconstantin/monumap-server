<template>
  <div>
    <q-list separator>
      <div class="row justify-around items-center bg-info">
        <p>Total</p>
        <p>0</p>
      </div>
      <div>
        <div class="row justify-around items-center bg-white">
          <p>{{ keyItem }}</p>
          <p>0</p>
        </div>
        <q-item
          clickable
          v-ripple
          :dense="dense"
          v-for="item in filteredArray"
          :key="item['cod_lmi']"
        >
          <q-item-section>{{item['denumire']}}</q-item-section>
        </q-item>
      </div>
    </q-list>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  data () {
    return {
      dense: true,
      keyItem: 'cod_lmi',
    }
  },
  computed: {
    monListKeys () {
      return Object.keys(this.$store.state.monuments.selectedItem);
    },
    filteredArray () {
      return this.$store.getters.monuments.getFilteredArray('cod_lmi');
    }
  },
}
</script>

<style lang="sass" scoped>
p
  margin: 0
</style>