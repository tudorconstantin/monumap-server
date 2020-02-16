<template>
  <div class="bg-grey-5">
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
        dense
        clickable
        v-ripple
        v-for="item in monFilteredList"
        :key="item['cod_lmi']"
        @click="selectMonument(item['cod_lmi'])"
      >
        <q-item-section>{{ item["denumire"] }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: "",
      dense: true
    };
  },
  computed: {
    filterText: {
      get () {
        return this.$store.state.monuments.filterText || "";
      },
      set: function (value) {
        this.$store.dispatch("monuments/setFilterText", value);
      }
    },
    monFilteredList () {
      return this.$store.getters["monuments/filteredArray"];
    }
  },
  methods: {
    selectMonument (codLmi) {
      this.$store.dispatch("monuments/selectItem", codLmi);
    }
  }
};
</script>

<style lang="sass" scoped></style>
