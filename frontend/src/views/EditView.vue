<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute ,useRouter} from 'vue-router';
const data = ref({})
const judul = ref('')
const penulis = ref('')
const isi = ref('')
const router = useRouter()
const id = ref(0)
const route = useRoute()
onMounted(async ()=>{
  try {
    id.value=route.params.id
    const response = await axios.get(`http://localhost:8000/note/${route.params.id}`);
    data.value = response.data.data[0]
    isi.value = data.value.isi
    judul.value = data.value.nama
    penulis.value = data.value.penulis
 
  } catch (error) {
    console.error(error);
  }
})


async function changeNote(){
  const res = await axios.put(`http://localhost:8000/note/${id.value}`, {  
    nama:judul.value,
    isi:isi.value,
    penulis:penulis.value
  });
  router.push({ path: '/' })
  console.log(res.data);
}
</script>

<template>
    <div class="container">
      <div class="mt-5">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">judul</label>
          <input type="text" class="form-control" id="exampleFormControlInput1" :placeholder=judul v-model="judul">
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">isi</label>
         
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" v-model="isi" :placeholder=isi></textarea>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">nama</label>
          <input type="text" class="form-control" id="exampleFormControlInput1" :placeholder=penulis v-model="penulis">
        </div>
        <div>
            <button @click="changeNote" type="button" class="btn btn-success me-2">change</button>
            <router-link to="/"><button @click="editNote" type="button" class="btn btn-danger me-2">cancel</button></router-link>
        </div>  
      </div>
    </div>
</template>
