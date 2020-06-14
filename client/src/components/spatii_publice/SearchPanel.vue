<template>
  <div class="bg-grey-5">
    <q-input bottom-slots v-model="filterText" label="Căutare" :dense="true">
      <template v-slot:prepend>
        <q-icon name="place" />
      </template>
      <template v-slot:append>
        <q-icon name="close" @click="filterText = ''" class="cursor-pointer" />
      </template>

      <template v-slot:hint>
        <div class="row">
          <p class="col text-left">Total selecție</p>
          <p class="col text-right">{{ countFilteredList }}</p>
        </div>
      </template>
    </q-input>
    <q-list separator>
      <q-item
        dense
        clickable
        v-ripple
        v-for="item in filteredItems"
        :key="item['properties']['cod_lmi']"
        @click="selectMonument(item['properties']['cod_lmi'])"
      >
        <q-item-section>{{ item['properties']['denumire'] }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  props: {
    items: { type: Array},    
    setFilter: { type: Function },
  },
  data() {
    return {
      dummyFilterText: '',
    };
  },
  computed: {
    filteredItems() {
      return this.items;
      // return this.$store.getters["monuments/filteredArray"];
    },
    countFilteredList() {
      return this?.filteredItems?.length;
    },
    filterText: {
      set(newVal) {
        this.$props.setFilter({ text: newVal });
        this.dummyFilterText = newVal;
      },
      get() {
        return this.dummyFilterText;
      },
    },
  },
  methods: {
    selectMonument(codLmi) {
      this.$store.dispatch('monuments/selectItem', codLmi);
    },
  },
};
</script>

<style lang="sass" scoped>
p
  padding: 0 30px
</style>
