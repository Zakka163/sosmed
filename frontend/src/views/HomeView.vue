<script setup>
import axios from 'axios'
import { useRoute ,useRouter} from 'vue-router';
import { ref,onMounted,watchEffect} from 'vue';
const page = ref(0)
const take = ref(10)
const paginationOrSearch = ref(false)
const data = ref([])
const limit = ref(0)
const conditionAlert = ref(false)
const search = ref('')
const route = useRoute()
const router = useRouter()
// watch(data,async ()=>{
//   try {
//     const response = await axios.post('http://localhost:8000/pagi',{
//     skip:page.value*10,
//     take:take.value,
//     order:"asc",
//     });
//     data.value = response.data.data
//     console.log('req...');
//   } catch (error) {
//     console.error(error);
//   }
// })
watchEffect(()=>{
  if (search.value.length!=0) {
    searchNote()
  }else {
    getNotePagination()
  }
  
})

onMounted(async ()=>{
  page.value = route.query.page || 0
  //getNotePagination()
  //console.log(data.value);

})
async function getNotePagination(){
  try {
    const response = await axios.post('http://localhost:8000/pagi',{
    skip:page.value*10,
    take:take.value,
    order:"asc",
    });
    data.value = response.data.data
    limit.value = response.data.data.length
    //console.log(response.data);
    console.log(data.value);
  } catch (error) {
    console.error(error);
  }
}
async function deleteNote(index,param){
  const response = await axios.delete(`http://localhost:8000/note/${param}`)
  if (response.status==200) {
    
    
    
    data.value.splice(index, 1);
    console.log(data.value);

    conditionAlert.value = true;
    getNotePagination()
    setTimeout(()=>{
      conditionAlert.value = false
    },3000)
   }
  

}


function nextpage(){
  
  if (limit.value!=0) {
    page.value++
  // route.query.page =
  //getNotePagination()
  router.push({ path: '/' , query:{page:page.value,search:search.value}})
  }
  
  
}
function previouspage(){
  if (page.value>0) {
    if (limit.value!=0) {
    page.value--
  // route.query.page =
  //getNotePagination()
    router.push({ path: '/' , query:{page:page.value,search:search.value}})
    }
  
  }
}
async function searchNote(){
  if (search.value.length!=0) {
    route.params.page = 0 
    page.value = 0
    const response = await axios.get(`http://localhost:8000/search/?search=${search.value}`)
    //console.log(route.query,data.data);
    data.value = response.data.data
    if(response.data.data.length<10){
      limit.value = 0
    }
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
          <div class="form-check form-switch mt-3 mb-3"><input class="form-check-input" type="checkbox" v-model="paginationOrSearch"></div>
          <form class="d-flex mt-2" role="search" >
              <input class="form-control me-2" type="search"  placeholder="Search" aria-label="Search " v-model="search">
              <button class="btn btn-outline-primary" type="button" @click="searchNote" >Search</button>
          </form>
        </div>


        <!-- <ul class="list-group mt-4">
          <li class="d-flex justify-content-between align-items-center list-group-item" v-for="(item, index) in data" :key="item.id">
           {{ page*10+index+1 }}<div class="col-2 text-truncate">{{ item.nama }}</div>
            <div>
            <router-link :to="{ name:'edit', params: { id: item.id },query:{page:page.value}}"><button @click="editNote" type="button" class="btn btn-success me-2">edit</button></router-link>
            <button  @click.prevent="deleteNote(index,item.id)" type="button" class="btn btn-danger me-2" >delete</button>
            </div>  
          </li>
        </ul> -->


      </div>
    </div>


    <div v-if="paginationOrSearch">
      <div class="d-flex justify-content-center mt-5">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                      <a @click.prevent="previouspage" class="page-link" href="#" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                              </a>
                                </li ><li class="page-item"><a class="page-link" href="#">{{ page }}</a></li><li class="page-item">
                              <a @click.prevent="nextpage" class="page-link" href="#" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
    
</template>
