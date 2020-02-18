/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
    { path: '/dashboard', component:  require('./components/Dashboard.vue').default },
    { path: '/admin', component:  require('./components/Admin.vue').default },
    { path: '/company', component:  require('./components/Company.vue').default },
    { path: '/workers', component:  require('./components/Worker.vue').default },
    { path: '/customers', component:  require('./components/Customer.vue').default },
    { path: '/jobs', component:  require('./components/Job.vue').default },
    { path: '/reviews', component:  require('./components/Review.vue').default },
    { path: '/alerts', component:  require('./components/Alert.vue').default }
    
  ]

  const router = new VueRouter({
    mode: 'history',
    routes, 
    linkActiveClass: 'active'// short for `routes: routes`
  })





/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});
