<template lang="html">

    <section class="customer-dashboard">
        <Header></Header>
        <div class="dashboard-section">
            <div class="dashboard-title">
                <h3 class="display-1"> Witaj w panelu użytkownika</h3>
                <h3 class="display-1" style="color: #009688"> Master Lease</h3>
                <h3 v-if="orderStatus" class="display-1">Dokończ realizację zamówienia:</h3>
            </div>
            <div class="row" v-if="orderStatus" style="margin-top: 15px">
                <v-layout>
                    <v-flex xs12 sm6 offset-sm3>
                        <v-card style="margin: 30px">
                            <v-img
                                    :src="car.url"
                                    aspect-ratio="2.75"
                            ></v-img>

                            <v-card-title style="margin-top: 5px" primary-title>
                                <div>
                                    <h3 class="headline mb-0">{{car.mark}} {{car.model}}</h3>
                                    <h3 class="headline mb-0">Cena netto: {{car.price}}</h3>
                                    <h3 class="headline mb-0">Wpłata własna: {{car.price * car.leasingEntryFee}} zł</h3>
                                    <h3 class="headline mb-0">Liczba rat: {{car.leasingTime}}</h3>
                                    <h3 class="headline mb-0">Kwota rat: {{car.leasingInstalmentPrice}} zł</h3>

                                </div>
                            </v-card-title>


                            <div class="row">
                                <div class="col">

                                </div>
                                <div class="col">
                                    <v-btn type="submit" @click="finishOrder"
                                           style="width: 100%; margin-top: 30px; margin-bottom: 30px" round color="teal"
                                           dark>Sfinalizuj zamówienie
                                    </v-btn>

                                </div>
                                <div class="col">

                                </div>
                            </div>


                        </v-card>
                    </v-flex>
                </v-layout>
            </div>
            <div class="row" style="margin-top: 30px; margin-bottom: 30px; padding: 30px">

                <div class="col" v-if="orderSuccessStatus">
                    <v-alert
                            :value="true"
                            type="success"
                    >
                        {{orderSuccessMessage}}
                    </v-alert>
                </div>


            </div>

            <div  v-if="!getLeasingDataFinally" class="text-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div  v-if="getLeasingDataFinally" class="leasing-table" style="text-align: center">
                <h3 class="display-1">
                    Lista zawartych umów leasingowych:
                </h3>
                <div class="table-responsive" style="margin-top: 60px">
                    <table class="table">
                        <thead style="text-align: center">
                        <tr>
                            <td scope="col">
                                Marka
                            </td>
                            <td scope="col">
                                 Model
                             </td>
                             <td scope="col">
                                 Cena netto
                             </td>
                            <td scope="col">
                                Czas trwania
                            </td>
                            <td scope="col">
                                Mesięczna rata
                            </td>
                            <td scope="col">
                                Wpłata własna
                            </td>


                        </tr>
                        </thead>
                        <tbody>

                        <tr style="text-align: center;" v-for="leasing in leasingDetails">
                            <td scope="row">
                                {{leasing.mark}}
                            </td>
                           <td scope="row">
                                {{leasing.model}}
                            </td>
                            <td scope="row">
                                {{leasing.price}} zł
                            </td>
                            <td scope="row">
                                {{leasing.leasingTime}} miesiące
                            </td>
                            <td scope="row">
                                {{leasing.leasingInstalmentPrice}} zł
                            </td>
                            <td scope="row">
                                {{leasing.leasingEntryFee*100}} %
                            </td>


                        </tr>

                        </tbody>

                    </table>
                </div>


            </div>
        </div>
    </section>

</template>

<script lang="js">
    import axios from 'axios';
    import LeasingService from "./LeasingService";

    const leasingService = new LeasingService();


    import Header from "../components/Header";

    export default {
        name: 'customer-dashboard',
        components: {Header},
        props: [],
        data() {
            return {
                dialog: false,
                notifications: false,
                sound: true,
                widgets: false,
                getLeasingDataFinally: false,
                car: {
                    userId: '',
                    carId: '',
                    mark: '',
                    model: '',
                    price: '',
                    url: '',
                    leasingEntryFee: '',
                    leasingTime: '',
                    leasingInstalmentPrice: ''
                },
                leasingDetails: '',
                userCarLeasing: [],
                orderStatus: true,
                orderSuccessMessage: '',
                orderSuccessStatus: false
            }
        },
        destroyed() {
            this.orderSuccessMessage = '';
        },
        mounted() {
            window.scrollTo(0, 0);
            axios.get(`http://localhost:3000/leasing/${localStorage.getItem('userId')}`)
                .then((res) => {
                    this.leasingDetails = res.data.leasing;
                    console.log('response:', res);
                    for (let i = 0; i < res.data.leasing.length; i++) {
                        this.getLeasingCar(res.data.leasing[i].carId, [i])
                    }


                    setTimeout(()=>{
                            this.getLeasingDataFinally = true;
                            console.log('this leasing details:', this.leasingDetails);
                    }, 1500)


                })
                .catch(() => {

                });

            if (leasingService.getLeasingData()) {
                axios.get(`http://localhost:3000/cars/${localStorage.getItem('leasingCarId')}`)
                    .then((response) => {
                        this.car.url = response.data.url;
                        this.car.price = response.data.price;
                        this.car.mark = response.data.mark;
                        this.car.model = response.data.model;
                        this.car.leasingEntryFee = localStorage.getItem('leasingEntryFee');
                        this.car.leasingTime = localStorage.getItem('leasingTime');
                        this.car.leasingInstalmentPrice = localStorage.getItem('leasingInstalmentPrice');
                        this.car.carId = response.data._id;
                        this.car.userId = localStorage.getItem("userId");
                    });


            } else {
                this.orderStatus = false;

            }
        },

        methods: {

            getLeasingCar(leasingCarId, leasingDetailsLength) {
                console.log('get leasing car', leasingCarId)
                axios.get(`http://localhost:3000/cars/${leasingCarId}`)
                    .then((response) => {
                        this.leasingDetails[leasingDetailsLength]['mark'] = response.data.mark;
                        this.leasingDetails[leasingDetailsLength]['model'] = response.data.model;
                        this.leasingDetails[leasingDetailsLength]['price'] = response.data.price;
                    })
                    .catch((e) => {
                    });

            },
            finishOrder() {
                axios.post(`http://localhost:3000/leasing`, this.car)
                    .then((response) => {

                        const newLeasing = {
                            mark: this.car.mark,
                            model: this.car.model,
                            price: this.car.price,
                            leasingEntryFee: this.car.leasingEntryFee,
                            leasingTime: this.car.leasingTime,
                            leasingInstalmentPrice: this.car.leasingInstalmentPrice
                        };

                        this.leasingDetails.push(newLeasing);


                        if (response.status === 200) {
                            this.orderStatus = false;
                            this.orderSuccessStatus = true;
                            this.orderSuccessMessage = 'Zamówienie zostało pomyślnie zakończone, na adres e-mail przesłaliśmy niezbędne dokumenty, zapraszamy po odbiór samochodu na ulicę Żeromskiego 19, pozdrawiamy zespół Master Lease';
                            localStorage.removeItem('leasingInstalmentPrice');
                            localStorage.removeItem('leasingCard');
                            localStorage.removeItem('leasingTime');
                            localStorage.removeItem('leasingCarId');
                            localStorage.removeItem('leasingEntryFee');
                        }

                        console.log('response:', response)

                    })
                    .catch((e) => {
                    })

            },

        },
        computed: {}
    }
</script>

<style scoped lang="scss">
    .spinner-border{
        width: 250px;
        height: 250px;
    }
    .container {

        min-height: 80vh;
        background-color: #f8f9fa !important;
    }

    .dashboard-section {

        min-height: 80vh;
        background-color: #f8f9fa !important;
    }

    .dashboard-title {
        text-align: center;
    }
</style>
