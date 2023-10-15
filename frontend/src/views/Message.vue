<script setup>
import { reactive } from 'vue';
import Navbar from '../components/Navbar.vue';

const data_message = reactive([
    { "id": 1, "nama": "zaka" },
    { "id": 2, "nama": "budi" },
    { "id": 3, "nama": "jhon" }
])


</script>

<template>
    <div>
        <Navbar />
    </div>
    <div class="container" style="margin-top: 70px;">
        <ul class="list-group" v-for="pesan in data_message" :key="pesan.id">
            <router-link :to="`/message/${pesan.id}`">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    {{ pesan.nama }}
                    <span class="badge bg-primary rounded-pill">1</span>
                </li>
            </router-link>
        </ul>
    </div>
</template>
