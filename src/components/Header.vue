<template lang="html">

  <div class="test">

      <div>
          <v-toolbar class="toolbar">
              <v-toolbar-title class="home-router">
                  <router-link :to="{name: 'Home' }">
                      MASTER LEASE
                  </router-link>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items class="hidden-sm-and-down">
                  <v-btn flat large color="white">Oferta</v-btn>
                  <v-btn flat large color="white">O Nas</v-btn>
                  <v-btn flat large color="white">Zaloguj</v-btn>

              </v-toolbar-items>
          </v-toolbar>
      </div>


  </div>


</template>

<script lang="js">
  export default  {
    name: 'header',
    props: [],
    mounted() {

    },
    data() {
      return {
        drawer: null
      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
  .toolbar{
    position: sticky;

  }
  .test{
      position: sticky;
  }
  .header {

  }
  .theme--light.v-toolbar{
        z-index: 999;
      background-color: #424242!important;
      color: white;

  }
  .test{
      position: sticky;
      position: -webkit-sticky;
      top: 0; /* required */
      z-index:999;
  }
    .router-link-exact-active router-link-active{
        color: white !important;
    }
    .home-router{
        color: white !important;
    }




</style>
