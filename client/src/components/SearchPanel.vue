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
  </div>
</template>

<style lang="sass" scoped>

</style>