<template>
    <div class="home">

        <img src="../../assets/image/home3.jpg">
        <Offerts></Offerts>
        <AboutUs></AboutUs>

    </div>
</template>

<script>
    import HelloWorld from '../components/HelloWorld'
    import axios from 'axios';
    import Offerts from "../components/Offerts";
    import Footer from "../components/Footer";
    import AboutUs from "../components/AboutUs";


    export default {
        components: {
            AboutUs,
            Footer,
            Offerts,
        },
        mounted() {

        }
    }
</script>
<style scoped>
    .home img {
        width: 100%;
    }

    .home {
        background-color: #009688;

    }

</style>
