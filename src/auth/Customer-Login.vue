<template lang="html">

    <section class="customer-login">
        <div class="card bg-light">
            <article class="card-body mx-auto" style="max-width: 400px;">

                <h4 class="card-title mt-3 text-center">
           <span style="color: #009688">
            Master Lease
          </span><br>
                    Zaloguj się do panelu użytkownika

                </h4>
                <p class="text-center">Panel użytkownika umożliwia zarządzanie i przeglądanie swoich umów leasingowych z
                    <span style="color: #009688">Master Lease</span></p><br>

                <p>
                    <a href="" class="btn btn-block btn-twitter"> <i class="fab fa-twitter"></i>   Zaloguj przez Twitter</a>
                    <a href="" class="btn btn-block btn-facebook"> <i class="fab fa-facebook-f"></i>
                         Zaloguj przez Facebook
                    </a>
                </p>
                <p class="divider-text">
                    <span class="bg-light">albo</span>
                </p>
                <b-form v-on:submit.prevent="onCustomerLogin" novalidate>

                    <div class="form-group input-group">
                        <v-flex xs12>
                            <v-text-field v-model="form.login" label="Login" type="text" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="form.password" label="Hasło" type="password" required></v-text-field>
                        </v-flex>


                    </div> <!-- form-group// -->

                    <div class="form-group">
                        <v-btn style="width: 100%" type="send" color="teal" dark>Zaloguj się</v-btn>
                        <h4 class="card-title mt-3 text-center">
                           <span style="color: #009688">
                            {{errorLogin}}
                          </span>
                        </h4>
                    </div> <!-- form-group// -->
                </b-form>


            </article>
        </div> <!-- card.// -->
    </section>

</template>

<script lang="js">
    import AuthService from "./AuthService";
    const authService = new AuthService();


    import axios from 'axios';

    export default {
        name: 'customer-login',
        props: [],
        mounted() {
            window.scrollTo(0, 0);
        },
        data() {
            return {
                form: {
                    login: '',
                    password: ''
                },
                errorLogin: ''
            }
        },
        methods: {
            onCustomerLogin() {
                axios.post("http://localhost:3000/login", this.form)
                    .then((r) => {
                        console.log('LOGIN RESPONSE:', r);

                        if(r.status === 200){
                            this.errorLogin = '';
                            authService.saveAuthData(r.data.token, r.data.expiresIn, r.data.userId);
                            this.$router.push({
                                name: "Customer Dashboard"
                            })

                        }
                    })
                    .catch((e) => {
                        if(e){
                            this.errorLogin = 'Wystąpił problem z logowaniem, użyj poprawnych danych!'
                            setTimeout(()=>{
                                this.errorLogin = '';
                                this.form.login = '';
                                this.form.password = '';
                            }, 1500)
                        }
                        console.log('ERROR RESPONSE LOGIN', e)
                    })

            }
        },
        computed: {}
    }
</script>

<style scoped lang="scss">
    .customer-login {
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
