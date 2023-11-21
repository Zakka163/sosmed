<script setup>
import Navbar from '../components/Navbar.vue'

import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import axios from 'axios';
import { useCookies } from "vue3-cookies"
import socket from '../socket.js' 
// import { status } from '../helper.js'

const router = useRouter()
const toast = useToast();

const cookies = useCookies()
const data_message = reactive([])
const user = ref('')

// socket.connect()

socket.on('refresh_message',(data)=>{
    if(data.status == 200){
        let panjang = data_message.length
        for (let index = 0; index < panjang; index++) {
            data_message.pop()
        }
        get_message()
    }
})

onMounted(() => {
    check_login()
    get_message()
})
function add_message(){
    // socket.emit('send_message',{"message":"halo"})
}

function check_login() {
    axios.post('http://sosmed-backend-api.vercel.app:8080/user/user_by_id', {
        token: cookies.cookies.get("token")
    }).then(response => {
        // console.log(response)
        if (response.data.status != 200) {
            toast.open({
                message: 'login required ',
                type: 'error',
                position: 'top-right',
                duration: 1000
            })
            router.push('login')
        } else {
            user.value = response.data.data[0].username
            // socket.auth.id = user.value
            // socket = {id:user.value}
            // socket.auth = { username:user.value }
            // socket.connect()
            // console.log(user.value)
        }

    }).catch(() => { router.push('login') })


    // .catch(() => {
    //     console.log("no")


    // })

}
function get_message() {
    axios.post('http://sosmed-backend-api.vercel.app:8080/message/list_message', {
        token: cookies.cookies.get("token")
    }).then((response) => {
        console.log(response.data.data_message)
        response.data.data_message.forEach(element => {
            data_message.push(element)
        });
    })
}
</script>

<template>
    <div>
        <div>
            <Navbar :user="user" />
        </div>
        <div class="container" style="margin-top: 70px;">
            <ul class="list-group" v-for="pesan in data_message" :key="pesan.id">
                <router-link :to="`/message/${pesan.m_id}`">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <span v-if="user == pesan.u_1_username" class="badge bg-primary text-center">{{ pesan.u_2_username }}</span>
                        <span v-else class="badge bg-primary text-center" >{{ pesan.u_1_username }}</span>
                        <span>{{ pesan.last_message }}</span>
                        <span class="badge bg-success rounded-pill">1</span>
                    </li>
                </router-link>
            </ul>
            <div class="container center mt-2 rounded-pill">
                <button @click="add_message" type="submit" class="btn btn-primary">+</button>
            </div>
        </div>

    </div>
</template>
