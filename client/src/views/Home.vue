<template>
  <q-page class="home column fullscreen justify-evenly">

    <!-- DESKTOP -->
    <div v-if="$q.platform.is.desktop" class="fit column items-center justify-evenly">
      <div class="column items-center">
        <img
            src="../assets/logo_bucuresti_2050.svg"
            style="max-width: 600px; max-height: 250px;"
        >
        <h2 class="text-h2 text-blue-grey-10">Patrimoniul, locuirea și spațiile publice</h2>
        <q-btn
            to="lmi-2015"
            push
            rounded
            color="indigo-10"
            label="explorează"
            no-caps
            size="lg"
        />
      </div>
      <div class="bottom-row column items-center">
        <img
            src="../assets/logo_bucuresti_2050_text_cu-subtitlu_monocrom.svg"
            style="max-width: 400px; max-height: 120px;"
        >
      </div>
    </div>


    <!-- MOBILE -->
    <div v-if="$q.platform.is.mobile" class="fit column items-center justify-evenly">
      <div class="column items-center">
        <img
            src="../assets/logo_bucuresti_2050.svg"
            style="max-width: 200px; max-height: 180px;"
        >
        <h2 class="text-h5 text-center text-blue-grey-10">Patrimoniul, locuirea și spațiile publice</h2>
        <q-btn
            to="lmi-2015"
            push
            rounded
            color="indigo-10"
            label="explorează"
            no-caps
            size="lg"
        />
      </div>
      <div class="bottom-row column items-center">
        <img
            src="../assets/logo_bucuresti_2050_text_cu-subtitlu_monocrom.svg"
            style="max-width: 150px; max-height: 60px;"
        >
      </div>
    </div>

  </q-page>
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
  background-color: white
.top-row
  background-color: white
.bottom-row
  background-color: white
</style>