<script setup>
import { reactive, ref } from 'vue';
import axios from 'axios';

const user_id = ref(' ')
const user_name = ref(' ')
const show_chat = ref(false)

const message_id = ref('')
const to_user_id = ref('')
const chat_value = ref('')

const data_message = ref([])
const data_chat = ref([])


function fetch_user() {

  axios.get(`http://localhost:5001/user/user_by_id/${user_id.value}`).then(function (response) {
    user_name.value = response.data.data[0].username
    axios.post(`http://localhost:5001/message/list_message`, {
      user_id: user_id.value
    }).then(function (response) {
      console.log(response.data);
      data_message.value = response.data.data_message
    })
  })

}

function fetch_message(param) {
  show_chat.value = true
  axios.post(`http://localhost:5001/message/list_by_message`, {
    message_id: param
  }).then(function (response) {
    // handle success
    // console.log(response.data.data_message);
    data_chat.value = response.data.data_message
    // to_user_id.value = response.data.data_message[0].to_user_id
    // console.log(data_message._rawValue)
    // user_name.value = response.data.data[0].username
  })
  axios.get(`http://localhost:5001/message/detail_message/${param}`).then(function(response){
    if (response.data.data[0].user_id_1 == user_id.value) {
      to_user_id.value = response.data.data[0].user_id_2
      // console.log("sama");
    }else{
      to_user_id.value = response.data.data[0].user_id_1
    }
    message_id.value = response.data.data[0].m_id
    // console.log(to_user_id.value);
    // console.log(response.data.data[0].user_id_1)
  })
  
}
function send_message(param){
  axios.post(`http://localhost:5001/message/send_message`,{
    message_id:message_id.value,
    to_user_id:to_user_id.value,
    from_user_id:user_id.value,
    message_value:param
  }).then(function (response) {
    console.log(response);
  })
  // console.log(message_id.value);
}
</script>

<template>

  <div>{{ user_name }}</div>
  <br>
  <div>
    <input v-model="user_id" type="text">
    <button @click="fetch_user">SYNC</button>
  </div>

  <div style="margin-bottom: 100px;">
    <ul>
      <div v-for="value in data_message" >
        <li v-if = "value.user_id_1 != user_id" ><button @click="fetch_message(value.m_id)">{{ value.u_1_username }}</button></li>
        <li v-else ><button @click="fetch_message(value.m_id)">{{ value.u_2_username }}</button></li>
      </div>
    </ul>
  </div>


  <div v-if=show_chat>
    <ul>
      <div v-for="value in data_chat">
        <li  v-if="value.from_user_id == user_id"  >{{ value.message_value }}</li>
        <li style="list-style:none" v-else>{{ value.message_value }}</li>
      </div>
    </ul>
    <input v-model="chat_value" type="text">
    <button @click="send_message(chat_value)">send</button>
  </div>
</template>

