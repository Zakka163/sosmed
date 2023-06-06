<script setup>
import axios from 'axios'
import { ref,onMounted,computed} from 'vue';
let data = ref([])

let conditionAlert = ref(false)
let search = ref('')


const axiosinter = axios.create()
  axiosinter.interceptors.request.use((req)=>{
  return req
})
async function tesshortpol(){
  try {
    const response = await axios.get('http://localhost:8000/note');
    console.log('tes pol',response);
    data.value = response.data.data
  } catch (error) {
    console.error(error);
  } finally{
    console.log('pol');
    tesshortpol()
  }
}

const filtered = computed(() =>
    data.value.filter((i) =>
    i.isi.toLowerCase().startsWith(search.value.toLowerCase())
  )
)

onMounted(async ()=>{
  // tesshortpol()
  try {
    const response = await axiosinter.get('http://localhost:8000/note');
    console.log(data);
    data.value = response.data.data
    console.log(data);

  } catch (error) {
    console.error(error);
  }
})

async function deleteNote(index,param){
  const response = await axios.delete(`http://localhost:8000/note/${param}`)
  if (response.status==200) {
    

    data.value.splice(index, 1);
    conditionAlert.value = true;
    setTimeout(()=>{
      conditionAlert.value = false
    },3000)
   }
  

}
</script>

<template>
    <div class="container">
      <!-- <div v-if="conditionAlert" class="alert alert-success" role="alert">Succes to delete</div> -->
      <div class="mt-5">
        <div>
          <router-link to="/add">
            <button @click="addNote" type="button" class="btn btn-primary">Add</button>
          </router-link>
          
          <form class="d-flex mt-2" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search " v-model="search">
          <button class="btn btn-outline-primary" type="submit">Search</button>
          </form>
        </div>
        <ul class="list-group mt-4">
          <li class="d-flex justify-content-between align-items-center list-group-item" v-for="(item, index) in filtered" :key="item.id">
           <h3 class="text-center">{{ index }}</h3><div class="col-2 text-truncate">{{ item.isi }}</div>
            <div>
            <router-link :to="{ name:'edit', params: { id: item.id }}"><button @click="editNote" type="button" class="btn btn-success me-2">edit</button></router-link>
            <button  @click.prevent="deleteNote(index,item.id)" type="button" class="btn btn-danger me-2" >delete</button>
            </div>  
          </li>
        </ul>
      </div>
      
      <!-- <button  @click="tesNote" type="button" class="btn btn-danger me-2" >testing</button> -->

      <div>
        
        
      </div>
  
    </div>
</template>
