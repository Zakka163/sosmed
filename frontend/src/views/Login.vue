<script setup>
import { reactive,ref } from 'vue';
import { useRouter,useRoute } from 'vue-router'
import { inject } from 'vue'
import axios from 'axios';
import {status} from '../helper.js'

const router = useRouter()
const user = reactive({
    email:'',
    password:''
})
function login(){

    status.setter(true)
    router.push('/')

}
</script>

<template>
    <div>
        <div class="container w-25 p-3 mt-5 border border-2 rounded ">
            <div class="text-center ">Login</div>
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input v-model="user.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input v-model="user.password" type="password" class="form-control" id="exampleInputPassword1">
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button @click="login" type="submit" class="btn btn-primary">login</button>
            </form>
        </div>
    </div>

    <!-- <div>{{ user }}</div> -->
</template>
  
  