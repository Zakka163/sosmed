<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification';
import { useCookies } from 'vue3-cookies';
import socket from '../socket';

const text = ref('')
const user = ref('')
const to_user = ref('')
const route = useRoute()
const toast = useToast()
const cookies = useCookies()
const router = useRouter()
const conversation = reactive([

])
// socket.connect()

socket.on('refresh_conversation', (data) => {
    if (data.status == 200) {
        // alert("hapu")
        let panjang = conversation.length
        for (let index = 0; index < panjang; index++) {
            conversation.pop()
        }
        get_conversation()
    }
})



function check_login() {
    axios.post('http://localhost:5001/user/user_by_id', {
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
            user.value = response.data.data[0].id
            // console.log(user.value)
        }

    }).catch(() => { router.push('login') })



}
function backpage() {
    router.back()
}
function get_conversation() {

    axios.post('http://localhost:5001/message/list_by_message', {
        token: cookies.cookies.get("token"),
        message_id: route.params.id
    }).then((response) => {
        // console.log(response.data.data_message)
        if (response.data.data_message.length > 0) {
            // console.log("ada")
            if (response.data.data_message[0].from_user_id == user.value) {
                to_user.value = response.data.data_message[0].to_user_id
            } else {
                to_user.value = response.data.data_message[0].from_user_id
            }
            response.data.data_message.forEach(element => {
                conversation.push(element)
            });
        }
    })
}

function send_message() {
    socket.emit('send_message', {
        token: cookies.cookies.get("token"),
        message_id: route.params.id,
        to_user_id: to_user.value,
        from_user_id: user.value,
        message_value: text.value,
        // last_sent_user: user.value,
        // last_message: text.value
    })
    text.value = ''
    // axios.post('http://localhost:5001/message/send_message', {
    //     token: cookies.cookies.get("token"),
    //     message_id: route.params.id,
    //     to_user_id: to_user.value,
    //     from_user_id: user.value,
    //     message_value: text.value,
    //     // last_sent_user:user.value,
    //     // last_message:text.value
    // }).then((response) => {
    //     console.log(response.data.data)
    //     conversation.push(response.data.data)
    //     text.value = ''
    // });
}


onMounted(() => {
    check_login()
    get_conversation()
})

</script>

<template>
    <div class="container overflow-auto">
        <div><button @click="backpage" type="button" class="btn btn-warning mt-2 mb-2">BACK</button></div>

        <div v-for="pesan in conversation">
            <div v-if="pesan.from_user_id == user">{{ "> " }}{{ pesan.message_value }}</div>
            <div v-else>{{ pesan.message_value }}</div>
        </div>


        <div class="col w-50 mt-2">
            <textarea v-model="text" class="form-control mb-2" id="textAreaExample" rows="1"></textarea>
            <button @click="send_message" type="button" class="btn btn-info">SEND</button>
        </div>
        <!-- <div class="container py-3 mt-2">
            <div class="row d-flex justify-content-center ">
                <div class="card" id="chat1" style="border-radius: 15px;">
                
                    <div class="card-body " v-for="pesan in conversation">
                        <div v-if="!pesan.send">
                            <div class="d-flex flex-row justify-content-start mb-4">
                                <div class="p-3 ms-3" style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">
                                    <p class="small mb-0">{{ pesan.pesan }}</p>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="d-flex flex-row justify-content-end mb-4">
                                <div class="p-3 me-3 border" style="border-radius: 15px; background-color: #fbfbfb;">
                                    <p class="small mb-0">{{ pesan.pesan }}</p>
                                </div>
                            </div>
                        </div>

                    </div>



                    
                    <form class="row justify-content-center mb-2">
                        <div class="col-auto w-75">
                            <textarea class="form-control" id="textAreaExample" rows="1"></textarea>
                        </div>
                        <div class="col-auto">
                            <button type="button" class="btn btn-info">SEND</button>
                        </div>
                    </form>


                </div>
            </div>

        </div> -->
    </div>
</template>

<!-- <style>
.scroll {
    max-height: 100px;
    overflow-y: auto;
}
</style> -->