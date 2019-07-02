import Vue from "vue";
import App from "./App.vue"

new Vue({
    el: "#app",
    data: {
        title: "to do list"
    },
    render: (h) => h(App)
});