<template lang="html">

    <section class="customer-register">
        <div class="card bg-light">
            <article class="card-body mx-auto" style="max-width: 400px;">

                <h4 class="card-title mt-3 text-center">
           <span style="color: #009688">
            Master Lease
          </span><br>
                    Rejestracja nowego użytkownika

                </h4>
                <p class="text-center">Zacznij współpracę z profesjonalistami</p>
                <p>
                    <a href="" class="btn btn-block btn-twitter"> <i class="fab fa-twitter"></i>   Zarejestruj przez
                        Twitter</a>
                    <a href="" class="btn btn-block btn-facebook"> <i class="fab fa-facebook-f"></i>
                         Zarejestruj przez Facebook
                    </a>
                </p>
                <p class="divider-text">
                    <span class="bg-light">albo</span>
                </p>
                <b-form v-on:submit.prevent="onCustomerRegister" novalidate>

                    <div class="form-group input-group">
                        <v-flex xs12>
                            <v-text-field v-model="form.login" label="Login" type="text" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="form.password" label="Hasło" type="password" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="form.firstName" label="Imię" type="text" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="form.lastName" label="Nazwisko" type="text" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="form.pesel" label="Pesel" type="number" required></v-text-field>
                        </v-flex>

                    </div> <!-- form-group// -->

                    <div class="form-group">
                        <v-btn style="width: 100%" type="send" color="teal" dark>Zarejestruj się</v-btn>
                    </div> <!-- form-group// -->
                    <h4 class="card-title mt-3 text-center">
                            <span style="color: #009688">
                                {{successRegister}}
                            </span>
                    </h4>

                </b-form>
                <p class="text-center">
                    Masz już konto?
                    <router-link :to="{
                                      name: 'Customer Login',
                        }">
                        <a href="">Zaloguj się</a>
                    </router-link>

                </p>


            </article>
        </div> <!-- card.// -->

    </section>

</template>

<script lang="js">

    import axios from 'axios';

    export default {
        name: 'customer-register',
        props: [],
        mounted() {
            window.scrollTo(0, 0);
        },
        data() {
            return {
                form: {
                    login: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    pesel: ''
                },
                successRegister: '',

            }
        },
        methods: {
            onCustomerRegister() {
                console.log('form:', this.form);

                axios.post("http://localhost:3000/signup", this.form)
                    .then((r) => {
                        console.log('r:', r);
                        if (r.status === 201) {
                            this.successRegister = 'Rejestracja przebiegła pomyślnie, trwa przekierowanie do strony logowania';

                            setTimeout(() => {
                                this.$router.push({
                                    name: 'Customer Login'
                                })
                            }, 2500);

                        }
                    })
                    .catch((e) => {
                        console.log('e', e)
                    })
            }
        },
        computed: {},
        destroyed() {
            this.successRegister = '';
        }
    }
</script>

<style scoped lang="scss">
    .customer-register {
        min-height: 80vh;
        background-color: #f8f9fa!important;
        margin: 30px;

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
