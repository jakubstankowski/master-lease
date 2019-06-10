<template>
  <v-app>
    <Header></Header>
    <router-view></router-view>
    <!--<Home></Home>
    <CarView></CarView>-->
    <Footer></Footer>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Header from "./components/Header";
import Home from "./views/Home";
import CarView from "./views/CarView";
import Footer from "./components/Footer";

export default {
  name: 'App',
  components: {
    Footer,
    CarView,
    Home,
      Header,
    HelloWorld
  },
  data () {
    return {
      //
    }
  }
}
</script>
<style>
  body{
    background-color: #424242 !important;
  }
  .application--wrap{
    background-color: #424242;
  }
  .red.lighten-2{
    background-color: #009688 !important;
  }
</style>
