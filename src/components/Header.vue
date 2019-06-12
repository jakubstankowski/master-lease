<template lang="html">

    <div class="test">

        <div>
            <v-toolbar class="toolbar">
                <v-toolbar-title class="home-router">
                    <router-link :to="{name: 'Home' }">
                      <span class="project-name">MASTER LEASE
                      </span>
                    </router-link>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items v-if="!authStatus" class="hidden-sm-and-down">
                    <v-btn flat @click="onLogin" large color="white">Zaloguj</v-btn>
                    <v-btn @click="onRegister" flat large color="white">Zarejestruj</v-btn>
                </v-toolbar-items>

                <v-toolbar-items v-if="authStatus" class="hidden-sm-and-down">
                    <v-btn flat   @click="customerDashboard" large color="white">Panel użytkownika</v-btn>
                    <v-btn flat @click="onLogout" large color="white">Wyloguj</v-btn>

                </v-toolbar-items>

            </v-toolbar>
        </div>


    </div>


</template>

<script lang="js">
    import AuthService from "../auth/AuthService";

    const authService = new AuthService();


    export default {
        name: 'header',
        props: [],
        data() {
            return {
                drawer: null,
                authStatus: false,
            }
        },
        mounted(){
            if(authService.getAuthData()){
                this.authStatus = true;
            } else {
                this.authStatus = false;
            }

        },
        methods: {
            onRegister() {
                this.$router.push({
                    name: "Customer Register"
                });

            },
            onLogin() {
                this.$router.push({
                    name: "Customer Login"
                });

            },
            customerDashboard(){
                this.$router.push({
                    name: "Customer Dashboard"
                });
            },
            onLogout(){
                authService.clearAuthData();
                this.authStatus = false;
                this.$router.push({
                    name:'Home'
                })
            }
        },
        computed: {}
    }
</script>

<style scoped lang="scss">
    .toolbar {
        position: sticky;

    }

    .test {
        position: sticky;
    }

    .header {

    }

    .theme--light.v-toolbar {
        z-index: 999;
        background-color: #424242 !important;
        color: white;

    }

    .test {
        position: sticky;
        position: -webkit-sticky;
        top: 0; /* required */
        z-index: 999;
    }

    .router-link-exact-active router-link-active {
        color: white !important;
    }

    .home-router {
        color: white !important;
    }

    .project-name {
        color: white;
    }

    .project-name:hover {
        color: #009688;
        text-decoration: none !important;
    }


</style>
