<script setup>
import axios from 'axios'
import { ref ,onMounted,onBeforeUnmount,computed} from 'vue';
const data = ref([])
const conditionAlert = ref(false)
const search = ref('')

onBeforeUnmount(()=>{
console.log("yaaa");
})
const filtered = computed(() =>
  data.value.filter((n) =>
    n.isi.toLowerCase().startsWith(search.value.toLowerCase())
  )
)
// function tesNote(){
//   console.log(data.value);
 
//   console.log(data.value); 
// }

onMounted(async ()=>{
  
  try {
    const response = await axios.get('http://localhost:8000/note');
    console.log(response.data.data);

    data.value = response.data.data
    console.log(data.value);
  } catch (error) {
    console.error(error);
  }
})
// onUpdated(async ()=>{
//   try {
//     const response = await axios.get('http://localhost:8000/note');
//     console.log(response.data.data);

//     data.value = response.data.data
//   } catch (error) {
//     console.error(error);
//   }
// })
async function deleteNote(param){
  const response = await axios.delete(`http://localhost:8000/note/${param}`)
  if (response.status==200) {
    // const i = names.indexOf(selected.value)
    // names.splice(i, 1)
    // selected.value = first.value = last.value = ''
    const found = data.value.findIndex(element => element.id == param)
    data.value.splice(found, 1);
   }
  

}
</script>

<template>
    <div class="container">
      <div class="mt-5">
        <div v-if="conditionAlert" class="alert alert-success" role="alert">Succes to delete</div>
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
           <h3 class="text-center">{{ index  }}</h3>{{ item.isi }}
            <div>
            <router-link :to="{path:'/edit',query:{id: item.id}}"><button @click="editNote" type="button" class="btn btn-success me-2">edit</button></router-link>
            <button  @click="deleteNote(item.id)" type="button" class="btn btn-danger me-2" >delete</button>
            </div>  
          </li>
        </ul>
      </div>
      
      <!-- <button  @click="tesNote" type="button" class="btn btn-danger me-2" >testing</button> -->

      <div>
        
        
      </div>
  
    </div>
</template>
