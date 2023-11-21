<script setup>
// import Message from './components/Message.vue'
// import Home from './views/Home.vue';
// import { socket, state } from '../socket.js
import axios from 'axios';
import { useCookies } from "vue3-cookies"
import { defineProps } from 'vue'
import { useToast } from 'vue-toast-notification';
import { useRouter } from 'vue-router';

// console.log(socket)
// console.log(state)
const cookies = useCookies()
const toast = useToast()
const router = useRouter()

const username = defineProps(['user'])

function logout() {
    axios.post('http://sosmed-backend-api.vercel.app:8080/user/logout', {
        token: cookies.cookies.get("token")
    }).then(() => {
        toast.open({
            message: 'logout succes ',
            type: 'warning',
            position: 'top-right',
            duration: 1000,
            onDismiss:()=>{
                router.go(0)
            }

        })
    })
}

</script>

<template>
    <div>
        <nav class="navbar bg-body-tertiary fixed-top">

            <form class="container-fluid justify-content-center">
                <h4> <span class="me-5 mt-1 badge bg-light text-dark">{{ username.user }}</span></h4>
                <router-link to="/">
                    <button class="btn btn-outline-success me-2" type="button">Home</button>
                </router-link>
                <router-link to="/message">
                    <button class="btn btn btn-outline-secondary" type="button">Message</button>
                </router-link>
                <button @click="logout" type="button" class="ms-5 btn btn-warning">Logout</button>

            </form>
        </nav>
    </div>
</template>
  
  