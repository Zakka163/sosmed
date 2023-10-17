<script setup>
import { reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { inject } from 'vue'
import axios from 'axios';
import { useCookies } from "vue3-cookies"

import { status } from '../helper.js'

const router = useRouter()
const toast = useToast();

const cookies = useCookies()

const user = reactive({
    email_or_username: '',
    password: ''
})
function login() {
    if (!user.email_or_username || !user.password) {
        return toast.open({
            message: 'Something went wrong!',
            type: 'error',
            position: 'top-right',
            duration: 1000
        })
    }

    axios.post(`http://localhost:5001/user/login`, {
        email: user.email_or_username,
        username: user.email_or_username,
        password: user.password
    }).then(response => {
        console.log(response);
        toast.open({
            message: 'login succes',
            type: 'success',
            position: 'top-right',
            duration: 1000
        })
        cookies.cookies.set("token", response.data.acces_token);
        router.push('/')
    }).catch((err) => {
        // console.log(err.response.data.message);
        toast.open({
            message: err.response.data.message,
            type: 'error',
            position: 'top-right',
            duration: 1000
        })
    })


    // status.setter(true)

}
</script>

<template>
    <div>
        <div class="container w-25 p-3 mt-5 border border-2 rounded ">
            <div class="text-center ">Login</div>
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email or Username</label>
                    <input v-model="user.email_or_username" type="email" class="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input v-model="user.password" type="password" class="form-control" id="exampleInputPassword1">
                </div>
                <button @click="login" type="submit" class="btn btn-primary">login</button>
            </form>
        </div>
    </div>

    <!-- <div>{{ user }}</div> -->
</template>
  
  