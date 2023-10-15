<script setup>
// import Message from './components/Message.vue'
// import Home from './views/Home.vue';
// import { socket, state } from '../socket.js'

// console.log(socket)
// console.log(state)

</script>

<template>
    <div>
        <nav class="navbar bg-body-tertiary fixed-top">
            <form class="container-fluid justify-content-center">
                <router-link to="/"><button class="btn btn-outline-success me-2" type="button">Home</button></router-link>
                <router-link to="/message"> <button class="btn btn btn-outline-secondary" type="button">Message</button></router-link>
            </form>
        </nav>
    </div>
</template>
  
  