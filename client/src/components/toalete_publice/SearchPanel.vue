<template>
  <div class="bg-grey-5">
    <q-list separator v-for="group in itemGroups" :key="group.code">
      <q-expansion-item
        dense
        dense-toggle
        expand-separator
        v-model="group.open"
        :label="group.label"
      >
        <q-card>
          <q-card-section class="column bg-grey-4">
            <!-- <q-checkbox v-model="group.checked" /> -->

            <q-item
              dense
              clickable
              v-ripple
              v-for="item in filteredItems.filter(
                (i) => i.properties.source === group.code
              )"
              :key="item['properties']['locatie']"
              @click="selectItem(item['properties'])"
            >
              <q-item-section>{{
                item['properties']['locatie']
              }}</q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>

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
  </div>
</template>

<script>
export default {
  props: {
    items: { type: Array },
    setFilter: { type: Function },
    selectItem: { type: Function },
  },
  data() {
    return {
      dummyFilterText: '',
      itemGroups: [
        {
          code: 'TOALETE_PUBLICE',
          label: 'Toalete publice',
          checked: true,
          open: true,
        },
      ],
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
};
</script>

<style lang="sass" scoped>
p
  padding: 0 30px
</style>
