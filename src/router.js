import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CarView from './views/CarView';
import AdminLogin from './auth/Admin-Login';
import CustomerLogin from './auth/Customer-Login';
import AdminDashboard from './dashboard/Admin-Dashboard';
import CustomerDashboard from './dashboard/Customer-Dashboard';
import CustomerRegister from './auth/Customer-Register';


Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/car/:carId',
            name: 'Car View',
            component: CarView

        },
        {
            path: '/admin',
            name: 'Admin Login',
            component: AdminLogin

        },
        {
            path: '/login',
            name: 'Customer Login',
            component: CustomerLogin

        },
        {
            path: '/admin-dashboard',
            name: 'Admin Dashboard',
            component: AdminDashboard
        },
        {
          path:'/dashboard',
          name:'Customer Dashboard',
          component: CustomerDashboard
        },
        {
            path: '/register',
            name: 'Customer Register',
            component: CustomerRegister
        },



    ]
})
