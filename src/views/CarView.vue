<template lang="html">

    <section class="car-view">
        <Header></Header>
        <v-layout class="car-layout">
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-img
                            :src="car.url"
                            aspect-ratio="2.75"
                    ></v-img>

                    <v-card-title primary-title>
                        <div>

                            <h3 class="headline mb-0">{{car.mark}} {{car.model}}</h3>
                            <div>
                                Cena całkowita:
                                <strong style="color:#009688">
                                    {{car.price}} zł netto
                                </strong>
                            </div>
                        </div>


                    </v-card-title>
                    <v-card-text>

                        <div class="row">
                            <div class="col">
                                <div class="row">
                                    <div class="col">
                                        <v-chip class="chip" style="width: 100%" color="teal" text-color="white">
                                            <v-avatar>
                                                <v-icon>check_circle</v-icon>
                                            </v-avatar>
                                            Leasing 103%
                                        </v-chip>
                                    </div>
                                </div>
                                <div class="row">

                                    <div class="col">
                                        <v-chip class="chip" style="width: 100%" color="teal" text-color="white">
                                            <v-avatar>
                                                <v-icon>check_circle</v-icon>
                                            </v-avatar>
                                            Okres Spłaty 24 - 48 miesięcy
                                        </v-chip>
                                    </div>
                                </div>
                                <div class="row">

                                    <div class="col">
                                        <v-chip class="chip" style="width: 100%" color="teal" text-color="white">
                                            <v-avatar>
                                                <v-icon>check_circle</v-icon>
                                            </v-avatar>
                                            Opłata wstępna 10 - 40 %
                                        </v-chip>
                                    </div>


                                </div>
                            </div>
                            <div class="col">
                                Leasing łączy w sobie elementy kredytu i dzierżawy. Jako leasingobiorca korzystasz z
                                samochodu na warunkach ściśle określonych w umowie. Przedmiot leasingu w czasie trwania
                                umowy nie staje się Twoją własnością — jest Ci jedynie udostępniony na określony czas.
                                Po zakończeniu umowy leasingu możesz oczywiście wykupić leasingowane auto, a kwota
                                wykupu będzie dużo niższa, niż jego wartość rynkowa.


                            </div>
                        </div>

                        <div style="margin-top: 15px" class="tree">

                        </div>
                        <v-treeview :items="items"></v-treeview>


                        <div class="text-xs-center" style="margin-top: 30px">
                            Rata miesięczna:

                            <strong style="color:#009688">
                                {{leasing.instalmentPrice}} zł brutto
                            </strong>
                            |
                            <strong style="color:#009688">
                                {{leasing.leasingTime}} miesięcy
                            </strong>


                        </div>

                        <div class="row">
                            <div class="col">

                                <v-layout row justify-center>
                                    <v-dialog v-model="dialog" persistent max-width="400px">
                                        <template v-slot:activator="{ on }">
                                            <div class="text-xs-center" style="margin: 30px">
                                                <v-btn v-on="on" round color="teal" dark>Zmień wysokość raty</v-btn>
                                            </div>
                                        </template>
                                        <b-form v-on:submit.prevent="onChangeInstalment($event)" novalidate>
                                            <v-card>
                                                <v-card-title>
                                                    <span class="headline">Zmień wysokość raty leasingu</span>
                                                    <p>Cena netto auta:
                                                        <strong style="color: #009688">
                                                            {{car.price}}*
                                                        </strong>
                                                        zł</p>
                                                </v-card-title>
                                                <v-card-text>
                                                    <v-container grid-list-md>


                                                        <v-layout wrap>
                                                            <v-flex xs12 sm12>
                                                                <v-select
                                                                        item-text="name"
                                                                        item-value="last"
                                                                        v-model="leasing.entryFee"
                                                                        :items="leasing.entryFeeList"
                                                                        label="Procent Wpłaty Własnej"
                                                                >
                                                                </v-select>
                                                            </v-flex>
                                                            <v-flex xs12 sm12>
                                                                <v-select
                                                                        item-text="name"
                                                                        item-value="last"
                                                                        v-model="leasing.leasingTime"
                                                                        :items="leasing.leasingtimeList"
                                                                        label="Okres trwania umowy"
                                                                >
                                                                </v-select>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-container>
                                                    <small>*do ceny auta wliczone zostało ubezpieczenie w cenie 3800 zł
                                                        za rok
                                                    </small>
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="teal" flat @click="dialog = false">
                                                        Zamknij
                                                    </v-btn>
                                                    <v-btn type="submit" color="teal" flat @click="dialog = false">
                                                        Zmień
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </b-form>
                                    </v-dialog>
                                </v-layout>
                            </div>
                            <div class="col">
                                <div class="text-xs-center" style="margin: 30px">
                                    <v-btn @click="orderCar" round color="teal" dark>Zamów samochód</v-btn>
                                </div>

                            </div>


                        </div>

                        <div class="error-section" style="text-align: center">
                            <h4 class="display-1">
                                <strong style="color: #009688">
                                    {{errorOrder}}
                                </strong>
                            </h4>

                        </div>


                        <div class="text-xs-center" style="margin-top: 30px">
                            <p>Gdzie odbiorę samochód?</p>
                            <div class="row">
                                <div class="col">
                                    <p style="margin-top: 50%">
                                        Master Lease <br>
                                        ul. Żeromskiego 19 <br>
                                        26-600 Radom <br>
                                        tel. 111 222 333
                                    </p>

                                </div>
                                <div class="col">
                                    <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d409.35961620098215!2d21.150142448900212!3d51.40175407079413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47185ecc514d50f9%3A0x13ea5ce57f174ca9!2s%C5%BBeromskiego+19%2C+26-600+Radom!5e0!3m2!1spl!2spl!4v1544192772289"
                                            width="100%" height="400px" frameborder="0"
                                            style="border:0; margin-top: 30px" allowfullscreen></iframe>

                                </div>
                            </div>
                        </div>


                    </v-card-text>


                </v-card>
            </v-flex>

        </v-layout>
    </section>

</template>

<script lang="js">

    import axios from 'axios';
    import Header from "../components/Header";
    import AuthService from "../auth/AuthService";

    const authService = new AuthService();

    export default {
        name: 'car-view',
        components: {Header},
        props: [],
        data() {
            return {
                car: '',
                errorOrder: '',
                leasing: {
                    price: null,
                    entryFee: 0.1,
                    leasingTime: 48,
                    instalmentPrice: '',
                    entryFeeList: [
                        {
                            name: '10%',
                            last: 0.1
                        },
                        {
                            name: '20%',
                            last: 0.2
                        },
                        {
                            name: '30%',
                            last: 0.3
                        },
                        {
                            name: '40%',
                            last: 0.4
                        },
                    ],
                    leasingtimeList: [
                        {
                            name: '24 miesięcy',
                            last: 24
                        },
                        {
                            name: '36 miesięcy',
                            last: 36
                        },
                        {
                            name: '48 miesięcy',
                            last: 48
                        },
                    ]

                },
                dialog: false,
                rating: 5,
                items: [
                    {
                        id: 1,
                        name: 'Wyposażenie :',
                        children: []
                    },
                    {
                        id: 5,
                        name: 'Dokumenty do zawarcia umowy:',
                        children: [
                            {id: 6, name: 'ksero dowodu osobistego'},
                        ]
                    },
                    {
                        id: 15,
                        name: 'Do pobrania:',
                        children: [
                            {id: 16, name: 'oferta.pdf'},
                            {id: 17, name: 'masterlease.pdf'},
                        ]
                    },

                ]
            }
        },
        beforeCreate() {
            window.scrollTo(0, 0);

            const carId = this.$route.params.carId;
            console.log('CAR ID:', carId);
            axios.get(`http://localhost:3000/cars/${carId}`)
                .then((response) => {
                    this.car = response.data;
                    this.leasing.price = response.data.price;
                    this.calculateInsalmentPrice();
                    response.data.equipment.map((val) => {
                        this.items[0].children.push({
                            name: val
                        })
                    });

                })
                .catch((e) => {
                    console.log('eeeeerrrorr', e);
                });
        },
        mounted() {

        },
        methods: {

            orderCar() {

                if (authService.getAuthData()) {
                    this.saveLeasingDeatils();
                    this.$router.push({
                        name: 'Customer Dashboard'
                    });


                } else {
                    this.saveLeasingDeatils();
                    this.errorOrder = 'Trwa przekierowanie do rejestracji...';
                    setTimeout(() => {
                        this.$router.push({
                            name: 'Customer Register'
                        });


                    }, 2500)
                }

            },
            saveLeasingDeatils() {
                localStorage.setItem('leasingCarId', this.$route.params.carId);
                localStorage.setItem('leasingEntryFee', this.leasing.entryFee);
                localStorage.setItem('leasingTime', this.leasing.leasingTime);
                localStorage.setItem('leasingInstalmentPrice', this.leasing.instalmentPrice);
            },
            onChangeInstalment() {
                this.calculateInsalmentPrice();
            },
            calculateInsalmentPrice() {
                const carPrice = this.leasing.price;
                const leasingTime = this.leasing.leasingTime;
                const entryFee = this.leasing.entryFee;
                const sumLeasingDebt = carPrice * entryFee;
                const leasingDebt = carPrice - sumLeasingDebt;
                const firstPartInstalment = leasingDebt * 0.0074 * (Math.pow(1 + 0.0074, leasingTime)) - (carPrice * 0.1 * 0.0074);
                const secondPartInstalment = ((Math.pow(1 + 0.0074, leasingTime)) - 1);

                return this.leasing.instalmentPrice = Math.round(firstPartInstalment / secondPartInstalment);
            }

        },
        computed: {}
    }
</script>

<style scoped lang="scss">
    .car-view {
        background-color: #009688;

    }

    .car-layout {
        margin-top: 30px;
    }

    .primary--text {
        caret-color: #009688 !important;
        color: #009688 !important;
    }

    .red.lighten-2 {
        background-color: #009688 !important;
    }


</style>
