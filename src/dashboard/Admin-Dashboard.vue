<template lang="html">

    <section class="admin-dashboard">



            <h3 class="display-1">Witaj w panelu zarządzania</h3>
            <h3 class="display-1" style="color: #009688"> Master Lease</h3>

        <div class="text-xs-center" style="margin: 30px">
                <v-btn @click="homePage" round color="teal" dark>Strona główna</v-btn>
                <v-btn @click="logoutAdmin" round color="teal" dark>Wyloguj</v-btn>
            </div>
            <div class="row">
                <div class="col">
                    <div class="list-cars">
                        <b-col v-for="car in cars" style="margin-bottom: 15px">

                            <v-card class="v-card">
                                <v-img
                                        :src="car.url"
                                        aspect-ratio="2.75"
                                ></v-img>

                                <v-card-title primary-title>
                                    <div>
                                        <h3 class="headline mb-0">{{car.mark}} {{car.model}} 3.0 TDI </h3>

                                    </div>
                                </v-card-title>
                                <v-card-text>
                                    <p>Cena netto: {{car.price}}</p>
                                    <p>Dostępność: {{car.availability}}</p>
                                    <p>VIN: {{car.VIN}}</p>
                                    <p>Dostawca:<br></p>
                                    <ul>
                                        <li>
                                            Firma: {{carsProvider.company}}
                                        </li>
                                        <li>
                                            Adres: {{carsProvider.adress}}, 00-000 Warszawa
                                        </li>
                                        <li>
                                            E-Mail: {{carsProvider.contact}}
                                        </li>
                                        <li>
                                            Telefon: {{carsProvider.number}}
                                        </li>
                                    </ul>
                                </v-card-text>
                            </v-card>
                        </b-col>
                    </div>


                </div>
                <div class="col" style="text-align: center">
                    <h4 class="display-1">
                        Dodaj nowy samochód
                    </h4><br>

                    <b-form v-on:submit.prevent="onAddCar" novalidate>
                        <v-flex xs12>
                            <v-text-field v-model="form.mark" label="marka" required></v-text-field>
                        </v-flex>

                        <v-flex xs12>
                            <v-text-field v-model="form.model" label="model" type="text" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="form.engine" label="silnik" type="text" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="form.price" label="cena" type="number" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="form.provider" label="dostawca" type="text" required></v-text-field>
                        </v-flex>
                        <div class="text-xs-center" style="margin: 30px">
                            <v-btn type="submit" round color="teal" dark>Dodaj samochód</v-btn>
                        </div>
                    </b-form>

                </div>
            </div>

    </section>

</template>

<script lang="js">
    import axios from 'axios';



    export default {
        name: 'admin-dashboard',
        props: [],
        mounted() {
            this.getCar();
            this.getProviderDetails();
        },
        data() {
            return {
                cars: [],
                carsProvider:{
                    adress:'',
                    company:'',
                    contact:'',
                    number:''
                },
                form: {
                    mark: '',
                    model: '',
                    engine: '',
                    price: null,
                    provider: 'CAR LOGISTICS WARSAW',
                }
            }
        },
        methods: {
            homePage() {
                this.$router.push({name: "Home"})
            },
            logoutAdmin() {
                this.$router.push({name: "Home"})
            },
            getProviderDetails(){
                axios.get("http://localhost:3000/provider/5d00c322ffdf893218b1adc1")
                    .then((res)=>{
                        console.log('res', res.data)
                        this.carsProvider.company = res.data.company;
                        this.carsProvider.number = res.data.number;
                        this.carsProvider.contact = res.data.contact;
                        this.carsProvider.adress = res.data.adress;

                        console.log('cars:', this.carsProvider);
                    })
                    .catch((e)=>{
                        console.log('e', e)
                    })

            },
            getCar() {
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
            onAddCar() {
                axios.post("http://localhost:3000/cars", this.form)
                    .then((res) => {
                        console.log('res:', res)
                        if (res.status === 201) {
                            this.form.mark = '';
                            this.form.model = '';
                            this.form.price = null;
                            this.form.url = '';
                            this.form.engine = '';

                        }
                    })
                    .catch((e) => {
                        console.log('error:', e)
                    })


            }
        },
        computed: {}
    }
</script>

<style scoped lang="scss">
    .admin-dashboard {
        margin: 30px;
        min-height: 80vh;
        background-color: #f8f9fa!important;
    }

    .list-cars {
        max-height: 70vh;
        overflow: auto;
        margin-top: 30px;
        background-color: #424242;
    }

    .display-1 {
        margin-top: 15px;
    }
</style>
