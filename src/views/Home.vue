<template>
    <div class="home">
        <Header></Header>
        <img src="../../assets/image/home4.jpg">
        <Offerts></Offerts>

    </div>
</template>

<script>
    import HelloWorld from '../components/HelloWorld'
    import axios from 'axios';
    import Offerts from "../components/Offerts";
    import Footer from "../components/Footer";
    import AboutUs from "../components/AboutUs";
    import Header from "../components/Header";


    export default {
        components: {
            Header,
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
