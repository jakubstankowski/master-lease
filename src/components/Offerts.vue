<template lang="html">

    <b-container class="bv-example-row">
        <v-layout style="color: white" align-center>
            <v-flex>
                <h3 class="display-3">Witaj w Master Lease!</h3>

                <span class="subheading">
          Oferujemy usługi leasingowe najlepsze w kraju. Master Lease przygotowuje unikalne oferty finansowe dla różnych modeli, na wielu rynkach Europy. Każda oferta uwzględnia różnorodne aspiracje, potrzeby i gusta Klientów w zakresie wyboru modelu.
        </span>

                <v-divider class="my-3"></v-divider>

                <div class="title mb-3">Poznaj naszą ofertę!</div>
            </v-flex>
        </v-layout>
        <b-row>
            <b-col v-for="car in cars">
<!--
                v-if="car.availability !== true"
-->
                <v-card   class="v-card">
                    <v-img
                            :src="car.url"
                            aspect-ratio="2.75"
                    ></v-img>

                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">{{car.mark}} {{car.model}} 3.0 TDI </h3>
                            <div> Cena netto: {{car.price}}</div>
                        </div>
                        <div class="row">

                            <div class="col">
                                <v-chip class="chip" color="teal" text-color="white">
                                    <v-avatar>
                                        <v-icon>check_circle</v-icon>
                                    </v-avatar>
                                    Leasing 103%
                                </v-chip>
                            </div>
                            <div class="col">
                                <v-chip class="chip" color="teal" text-color="white">
                                    <v-avatar>
                                        <v-icon>check_circle</v-icon>
                                    </v-avatar>
                                    Okres Spłaty 24 - 48 miesięcy
                                </v-chip>
                            </div>
                            <div class="col">
                                <v-chip class="chip" color="teal" text-color="white">
                                    <v-avatar>
                                        <v-icon>check_circle</v-icon>
                                    </v-avatar>
                                    Opłata wstępna 10 - 40 %
                                </v-chip>
                            </div>


                        </div>
                    </v-card-title>

                    <div class="row">
                        <div class="col">
                            <router-link :to="{
                                      name: 'Car View',
                                      params: { carId: car._id }
                                      }">

                                <v-btn    style="width: 95%"  color="grey darken-3" dark>
                                    Poznaj szczegóły oferty auta
                                </v-btn>


                            </router-link>
                        </div>

                    </div>
                </v-card>
            </b-col>
        </b-row>
    </b-container>

</template>

<script lang="js">

    import axios from 'axios';

    export default {
        name: 'offerts',
        props: [],
        data() {
            return {
                cars: [/*{
                    id: null,
                    price: null
                }*/]
            }
        },
        beforeCreate() {
            axios.get("http://localhost:3000/cars")
                .then((response) => {
                    console.log('response:', response)
                    response.data.cars.map((car) => {
                        this.cars.push(car);
                    });

                    console.log('CAR:', this.cars);
                })
                .catch((e) => {
                    console.log('eeeeerrrorr', e);
                });
        },
        mounted() {

        },

        methods: {

        },
        computed: {}
    }
</script>

<style scoped lang="scss">

    .theme--light.v-divider {
        border-color: white !important;
    }

    .offerts {

    }

    .col {
        margin-bottom: 15px;
        margin-top: 15px;
    }

    .v-card:hover {
        transform: scale(1.05)

    }

    .chip {

        width: 100%;
    }


</style>
