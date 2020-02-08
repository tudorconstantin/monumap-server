<template>
  <div>
    <q-input
      bottom-slots
      v-model="text"
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
        :key="item['cod LMI']"
      >
        <q-item-section>{{item['denumire']}}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
// import mapGetters
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      text: '',
      dense: true,
    }
  },
  computed: {
    ...mapGetters({
      monFilteredList: 'monuments/getFilteredArray',
    }),
  },
}
</script>

<style lang="sass" scoped>

</style>