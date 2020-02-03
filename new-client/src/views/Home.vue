<template>
  <div class="home column fullscreen justify-center items-center">
    <div class="column items-center">
      <h1 class="text-h1 text-blue-grey-10">Romania in Harti</h1>
      <q-btn
        to="lmi"
        push
        rounded
        color="indigo-10"
        label="Vezi Harta"
        no-caps
        size="lg"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data () {
    return {
    }
  },
};
</script>

<style lang="sass" scoped>
.home
  background-color: #e2c036
</style>