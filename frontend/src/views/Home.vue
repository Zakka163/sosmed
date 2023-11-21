<script setup>
import Navbar from '../components/Navbar.vue'
import { onMounted, onBeforeMount, ref, defineProps, onUpdated, onBeforeUpdate } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { inject } from 'vue'
import { status } from '../helper';
import { useToast } from 'vue-toast-notification';
import { useCookies } from "vue3-cookies"
import axios from 'axios';


const toast = useToast()
const cookies = useCookies()
const user = ref('')
// const status_login = ref(false)
const router = useRouter()
const route = useRoute()
const props = defineProps(['status'])




onMounted(() => {
    check_login()

})


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
            console.log(user.value)
        }

    }).catch(()=>{router.push('login')})


    // .catch(() => {
    //     console.log("no")


    // })

}

</script>

<template>
    <div>
        <Navbar :user="user" />
    </div>
    <div class="container" style="margin-top: 70px;">
    </div>
    <!-- <div>haloo {{ user }}</div> -->
</template>
  
  