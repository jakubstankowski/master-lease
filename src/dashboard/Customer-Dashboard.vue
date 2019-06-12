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
                                        <v-btn type="submit"  @click="finishOrder" style="width: 100%; margin-top: 30px; margin-bottom: 30px" round color="teal" dark>Dokończ zamówienie</v-btn>

                                    </div>
                                    <div class="col">

                                    </div>
                                </div>


                        </v-card>
                    </v-flex>
                </v-layout>
            </div>
            <div   class="row" style="margin-top: 30px" >
                <div class="col">

                </div>
                <div class="col" v-if="orderSuccessStatus">
                    <v-alert
                            :value="true"
                            type="success"
                    >
                        {{orderSuccessMessage}}
                    </v-alert>
                </div>
                <div class="col">

                </div>


            </div>

            <div class="leasing-table" style="text-align: center">
                <h3 class="display-1">
                    Lista zawartych umów leasingowych:
                </h3>

                <tree-view :data="userCarLeasing" :options="{maxDepth: 2}"></tree-view>
             <!-- <div class="table-responsive" v-for="car of userCarLeasing.model">
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
                                Delete
                            </td>


                        </tr>
                        </thead>
                        <tbody>
                        <tr style="text-align: center;" >
                            <td scope="row">
                                {{car}}
                            </td>

                           &lt;!&ndash; <td scope="row">
                                <div id="delete-button">
                                    <b-button
                                            @click="onDeleteUrl(url)"
                                            type="submit"
                                            variant="ghost-danger"
                                            class="delete-button"

                                    >
                                        <i class="icon-trash"></i>
                                    </b-button>
                                </div>

                            </td>&ndash;&gt;
                        </tr>

                        </tbody>

                    </table>
                </div>&ndash;&gt;-->
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
                car: {
                    userId:'',
                    carId:'',
                    mark: '',
                    model: '',
                    price: '',
                    url: '',
                    leasingEntryFee: '',
                    leasingTime: '',
                    leasingInstalmentPrice: ''
                },
                leasing:[


                ],
                userCarLeasing:{
                    Marka:[],
                    Model:[],
                    Rata:[],
                    Okres:[],

                },
                orderStatus: true,
                orderSuccessMessage: '',
                orderSuccessStatus: false
            }
        },
        destroyed(){
          this.orderSuccessMessage = '';
        },
        mounted() {

            axios.get(`http://localhost:3000/leasing/${localStorage.getItem('userId')}`)
                .then((res)=>{

                    for(let i = 0; i<res.data.cars.length; i++){
                        this.getLeasingUserCar(res.data.cars[i])
                    }
                    res.data.leasingInstalmentPrice.map((val)=> this.userCarLeasing.Rata.push(val));
                    res.data.leasingTime.map((val)=> this.userCarLeasing.Okres.push(val));
                    console.log('res:', res.data)
                })
                .catch(()=>{

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

                console.log('jeee wybrano auto')
            } else {
                this.orderStatus = false;
                console.log('nie maaaaa')
            }
        },

        methods: {
            finishOrder(){
                axios.post(`http://localhost:3000/leasing`, this.car)
                    .then((response) => {
                        if(response.status === 200){
                            this.orderStatus = false;
                            this.orderSuccessStatus = true;
                            this.orderSuccessMessage = 'Zamówienie zostało pomyślnie zakończone, na adres e-mail przesłaliśmy niezbędne dokumenty, zapraszamy po odbiór samochodu na ulicę Żeromskiego 19, pozdrawiamy zespół Master Lease';
                            localStorage.removeItem('leasingInstalmentPrice');
                            localStorage.removeItem('leasingCard');
                            localStorage.removeItem('leasingTime');
                            localStorage.removeItem('leasingCarId');
                            localStorage.removeItem('leasingEntryFee');
                        }
                       console.log('resssss', response)
                    })
                    .catch((e)=>{
                        console.log('e', e)
                    })

            },
            getLeasingUserCar(carId){
                axios.get(`http://localhost:3000/cars/${carId}`)
                    .then((response) => {
                        console.log('response', response)
                        this.userCarLeasing.Marka.push(response.data.mark);
                        this.userCarLeasing.Model.push(response.data.model);
                        console.log('user car leasing:', this.userCarLeasing);
                    })
                    .catch((e) => {
                        console.log('eeeeerrrorr', e);
                    });

            }
        },
        computed: {}
    }
</script>

<style scoped lang="scss">
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
