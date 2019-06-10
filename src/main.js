import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import 'vuetify/dist/vuetify.min.css'

import Vuetify from 'vuetify'

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)


Vue.use(Vuetify)

//czarny: #424242
//zielony: #009688

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
