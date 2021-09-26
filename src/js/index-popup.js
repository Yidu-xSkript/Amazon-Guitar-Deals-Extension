import Vue from "vue";
import Popup from './components/Popup.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);

const app = new Vue({
  el: "#app",
  render: createElement => createElement(Popup)
})