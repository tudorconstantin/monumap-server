<!-- lmi-2015 :: albumDates -->

<template>
  <div class="">
    <q-dialog
        v-model="dialog"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
        class="transparent"
    >
      <!--  DESKTOP - WRAPPER ITEM   -->
      <q-layout v-if="$q.platform.is.desktop" class="bg-grey-9 text-white hide-scrollbar" view="lHr LpR lfr">
        <!-- HEADER -->
        <q-header reveal class="bg-transparent row justify-center">
          <div class="bg-transparent no-border q-ma-md gt-sm">
            <div style="width: 54px; height: 54px"></div>
          </div>

          <q-btn-group rounded class="q-ma-md header-btn-group">
            <q-btn
                color="grey"
                rounded
                no-caps
                :ripple="false"
                class="text-h6 no-pointer-events"
                :label="this.$store.state.lmi2015.selectedItem ? this.$store.state.lmi2015.selectedItem['cod_lmi'] : ''"
            />
            <q-btn
                color="amber-14"
                rounded
                no-caps
                :ripple="false"
                class="text-h6 no-pointer-events"
                :label="this.$store.state.lmi2015.selectedItem ? this.$store.state.lmi2015.selectedItem['denumire'] : ''"
            />
            <q-btn
                round
                type="button"
                size="18px"
                color="deep-orange"
                @click="dialog = false"
                icon="clear"
                class="q-ma-none"
                v-if="$q.screen.width < 1024"
            />
          </q-btn-group>

          <div class="bg-transparent no-border gt-sm">
            <q-btn
                round
                type="button"
                size="18px"
                color="deep-orange"
                @click="dialog = false"
                icon="clear"
                class="q-ma-md"
            />
          </div>
        </q-header>

        <!-- PAGE -->
        <q-page-container class="q-gutter-md q-ma-xl bg-transparent"
                          style="min-width: 360px">
          <div
              v-for="(album) in photoAlbums"
              :key="album.date"
              class="q-pa-xs q-ma-none row items-start q-gutter-md justify-center"
          >
            <q-responsive :ratio="4/3" class="col q-ma-none" style="max-height: 170px; max-width: 500px">
              <q-card
                  v-ripple
                  class="column cursor-pointer"
                  :ratio="4/3"
                  @click="openNext(album.date)"

              >
                <q-img
                    :src="album.sections[0].thumbnails[0]"
                    class="col dimmed"
                    @mouseenter="$event.target.classList.toggle('dimmed')"
                    @mouseleave="$event.target.classList.toggle('dimmed')"
                >
                </q-img>
                <div
                    class="text-h5 absolute-bottom text-center q-pa-sm"
                    style="background-color: rgba(0,0,0, 0.5)"
                >
                  {{ album.date }}
                </div>
                <q-btn
                    rounded
                    color="blue"
                    icon="photo_camera"
                    class="absolute no-pointer-events"
                    style="top: 30px; right: 12px; transform: translateY(-50%);"
                    :label="album.photoCount"
                    :ripple="false"
                />
              </q-card>
            </q-responsive>
          </div>
        </q-page-container>
      </q-layout>
      <!--  DESKTOP - WRAPPER ITEM   -->

      <!--  MOBILE - WRAPPER ITEM   -->
      <q-layout v-if="$q.platform.is.mobile" class="bg-grey-9 text-white hide-scrollbar" view="lHr LpR lfr">
        <!-- HEADER -->
        <q-header reveal class="bg-transparent row justify-center">
          <div v-if="$q.screen.width >= 640" class="bg-transparent no-border q-ma-sm">
            <div style="width: 54px; height: 54px"></div>
          </div>

          <q-btn-group rounded class="q-ma-sm">
            <q-btn
                color="grey"
                rounded
                no-caps
                :ripple="false"
                class="text-h7 no-pointer-events"
                :label="this.$store.state.lmi2015.selectedItem ? this.$store.state.lmi2015.selectedItem['cod_lmi'] : ''"
            />
            <q-btn
                color="amber-14"
                rounded
                no-caps
                :ripple="false"
                class="text-h7 no-pointer-events"
                :label="this.$store.state.lmi2015.selectedItem ? this.$store.state.lmi2015.selectedItem['denumire'] : ''"
            />
            <q-btn
                round
                type="button"
                size="15px"
                color="deep-orange"
                @click="dialog = false"
                icon="clear"
                class="q-ma-none"
                v-if="$q.screen.width < 640"
            />
          </q-btn-group>

          <div v-if="$q.screen.width >= 640" class="bg-transparent no-border">
            <q-btn
                round
                type="button"
                size="18px"
                color="deep-orange"
                @click="dialog = false"
                icon="clear"
                class="q-ma-sm"
            />
          </div>
        </q-header>

        <!-- PAGE -->
        <q-page-container class="q-gutter-md q-ma-sm q-mt-sm bg-transparent"
                          style="min-width: 300px">
          <div
              v-for="(album) in photoAlbums"
              :key="album.date"
              class="q-pa-xs q-ma-none row items-start q-gutter-md justify-center"
          >
            <q-responsive :ratio="16/9" class="col q-ma-none" style="max-height: 150px; max-width: 400px">
              <q-card
                  v-ripple
                  class="column cursor-pointer"
                  :ratio="16/9"
                  @click="openNext(album.date)"

              >
                <q-img
                    :src="album.sections[0].thumbnails[0]"
                    class="col"
                >
                </q-img>
                <div
                    class="text-h6 absolute-bottom text-center q-pa-sm"
                    style="background-color: rgba(0,0,0, 0.5)"
                >
                  {{ album.date }}
                </div>
                <q-btn
                    rounded
                    color="blue"
                    icon="photo_camera"
                    class="absolute no-pointer-events"
                    style="top: 30px; right: 12px; transform: translateY(-50%);"
                    :label="album.photoCount"
                    :ripple="false"
                />
              </q-card>
            </q-responsive>
          </div>
        </q-page-container>
      </q-layout>
      <!--  MOBILE - WRAPPER ITEM   -->

    </q-dialog>
  </div>
</template>

<script>

export default {
  name: "AlbumDates",

  data() {
    return {
      maximizedToggle: true,
    };
  },

  components: {},

  computed: {
    dialog: {
      get() {
        return this.$store.state.lmi2015.albumDatesDialog;
      },
      set: function () {
        this.$store.dispatch("lmi2015/toggleAlbumDatesDialog");
      }
    },

    photoAlbums() {
      return this.$store.getters["lmi2015/getSelectedItemPhotoAlbums"];
    },
  },

  methods: {
    selectedDateAlbum(selectedDate) {
      // console.log('@AlbumDates.vue :: @selectedDateAlbum >> selected date: ', selectedDate);
      return this.photoAlbums.filter(item => item.date === selectedDate)[0];
    },

    openAlbumSections: (vueStore, selectedDate) => {
      // console.log('@AlbumDates.vue :: @openAlbumSections >> selectedDate: ', selectedDate);
      vueStore.dispatch("lmi2015/toggleAlbumSectionsDialog", selectedDate);
    },

    openAlbumPhotoGallery: (vueStore) => {
      // console.log('@AlbumDates.vue :: @openAlbumPhotoGallery');
      vueStore.dispatch("lmi2015/toggleAlbumPhotoGalleryDialog");
    },

    openNext: function (selectedDate) {
      // console.log('@AlbumDates.vue :: @openNext >> selected date: ', selectedDate);
      // set new date
      this.$store.dispatch("lmi2015/setAlbumSelectedDate", selectedDate);

      // next step for selected date
      // console.log('selectedDateAlbum: ', this.selectedDateAlbum(selectedDate));
      const sectionsLength = this.selectedDateAlbum(selectedDate).sections.length;
      // console.log('@AlbumDates.vue :: @openNext >> selectedItem.PhotoAlbums.sections.length: ', sectionsLength);
      if (sectionsLength === 1) {
        this.openAlbumPhotoGallery(this.$store);
      } else {
        this.openAlbumSections(this.$store);
      }
    },

  },
}
</script>


<style lang="sass" scoped>

.header-btn-group
  max-width: 80%

</style>