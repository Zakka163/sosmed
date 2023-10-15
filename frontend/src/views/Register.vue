<script setup>
import { reactive } from 'vue';
import axios from 'axios';


const user = reactive({
    email:'',
    username:'',
    password:''
})


function register(){
    console.log(user.email)
}
</script>

<template>
    <div>
        <div class="container w-25 p-3 mt-5 border border-2 rounded ">
            <div class="text-center ">Register</div>
            <form>
                <div class="mb-3">
                    <label for="exampleInputUserName" class="form-label">Username</label>
                    <input v-model="user.username" type="text" class="form-control" id="exampleInputUserName" aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input v-model="user.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input v-model="user.password" type="password" class="form-control" id="exampleInputPassword1">
                </div>

                <button @click="register" type="submit" class="btn btn-primary">register</button>
            </form>
        </div>
    </div>

    <!-- <div>{{ user }}</div> -->
</template>
  
  