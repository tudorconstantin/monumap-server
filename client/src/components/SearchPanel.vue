<template>
  <div>
    <q-input
      bottom-slots
      v-model="filterText"
      label="Căutare"
      counter
      :dense="dense"
    >
      <template v-slot:prepend>
        <q-icon name="place" />
      </template>
      <template v-slot:append>
        <q-icon
          name="close"
          @click="text = ''"
          class="cursor-pointer"
        />
      </template>

      <template v-slot:hint>
        Total selecție
      </template>
    </q-input>
    <q-list separator>
      <q-item
        clickable
        v-ripple
        v-for="item in monFilteredList"
        :key="item['cod_lmi']"
      >
        <q-item-section>{{item['denumire']}}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>

export default {
  data () {
    return {
      text: '',
      dense: true,
    }
  },
  computed: {
    filterText: {
      get () {
        return this.$store.state.monuments.filterText || '';
      },
      set (value){
        this.$store.commit('monuments/setFilterText', value);
      }
    },
    monFilteredList () {
      return this.$store.state.monuments.items.filter( m => m['cod_lmi'] && m['cod_lmi'].toLowerCase().indexOf(this.filterText.toLowerCase()) > -1);
    }
  },
}
</script>

<style lang="sass" scoped>

</style>