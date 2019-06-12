<template lang="html">

    <section class="admin-login">
        <div class="card bg-light">
            <article class="card-body mx-auto" style="max-width: 400px;">

                <h4 class="card-title mt-3 text-center">
           <span style="color: #009688">
            Witaj administratorze!
          </span><br>
                   Zaloguj się aby uzyskać dostęp do systemu
                </h4>
                <b-form v-on:submit.prevent="onAdminLogin" novalidate>

                    <div class="form-group input-group">
                        <v-flex xs12>
                            <v-text-field  v-model="form.login"  label="Login" type="text" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field  v-model="form.password" label="Hasło" type="password" required></v-text-field>
                        </v-flex>


                    </div> <!-- form-group// -->

                    <div class="form-group">
                        <v-btn  style="width: 100%" type="send"  color="teal" dark>Zaloguj się</v-btn>
                    </div> <!-- form-group// -->
                </b-form>



            </article>
        </div> <!-- card.// -->    </section>

</template>

<script lang="js">
    export default {
        name: 'admin-login',
        props: [],
        mounted() {

        },
        data() {
            return {
                form: {
                    login: '',
                    password: ''
                }
            }
        },
        methods: {
            onAdminLogin(){
                console.log('form', this.form)

                const login = 'admin';
                const password = 'admin';

                if(this.form.login === login && this.form.password === password){
                    this.$router.push({
                        name: 'Admin Dashboard'
                    })
                }

            }

        },
        computed: {}
    }
</script>

<style scoped lang="scss">
    .admin-login {
        min-height: 80vh;
        background-color: #f8f9fa!important;
        margin: 30px;
    }

    .v-card__title v-card__title--primary {
        min-height: 50vh;
    }
    .divider-text {
        position: relative;
        text-align: center;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .divider-text span {
        padding: 7px;
        font-size: 12px;
        position: relative;
        z-index: 2;
    }

    .divider-text:after {
        content: "";
        position: absolute;
        width: 100%;
        border-bottom: 1px solid #ddd;
        top: 55%;
        left: 0;
        z-index: 1;
    }

    .btn-facebook {
        background-color: #405D9D;
        color: #fff;
    }

    .btn-twitter {
        background-color: #42AEEC;
        color: #fff;
    }
</style>
