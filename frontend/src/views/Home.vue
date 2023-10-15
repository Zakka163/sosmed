<script setup>
import Navbar from '../components/Navbar.vue'
import { onMounted,onBeforeMount, ref, defineProps, onUpdated, onBeforeUpdate } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { inject } from 'vue'
import { status } from '../helper';

const user = ref('')
const router = useRouter()
const route = useRoute()
const props = defineProps(['status'])




onMounted(() => {
    // console.log(status)
    if (!status.getter()) {
        router.push('login')
    }
})

</script>

<template>
    <div>
        <Navbar />
    </div>
    <div>haloo {{ user }}</div>
</template>
  
  