<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toast-notification';

const toast = useToast();



const user = reactive({
    email: '',
    username: '',
    password: ''
})


function register() {
    console.log(user)
    if (!user.email || !user.password || !user.username) {
        return toast.open({
            message: 'Something went wrong!',
            type: 'error',
            position: 'top-right',
            duration: 1000
        })
        
    }
    axios.post(`http://localhost:5001/user/register`, {
        email: user.email,
        username: user.username,
        password: user.password
    }).then(response => {
        console.log(response);
        toast.open({
            message: 'register succes',
            type: 'success',
            position: 'top-right',
            duration: 1000
        })
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

}
</script>

<template>
    <div>
        <div class="container w-25 p-3 mt-5 border border-2 rounded ">
            <div class="text-center ">Register</div>
            <form>
                <div class="mb-3">
                    <label for="exampleInputUserName" class="form-label">Username</label>
                    <input v-model="user.username" type="text" class="form-control" id="exampleInputUserName"
                        aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input v-model="user.email" type="email" class="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp">
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
  
  