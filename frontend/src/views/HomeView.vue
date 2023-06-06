<script setup>
import axios from 'axios'
import { useRoute ,useRouter} from 'vue-router';
import { ref,computed,onMounted, onUpdated,onBeforeMount} from 'vue';
const page = ref(0)
const take = ref(10)
const cursor = ref(0)
const data = ref([])
const conditionAlert = ref(false)
const search = ref('')
const route = useRoute()
const router = useRouter()
// const axiosinter = axios.create()


// axiosinter.interceptors.request.use((req)=>{
// return req
// })

// setInterval(()=>{
//   getNotePagination()
// },5000)
const filtered = computed(() =>
    data.value.filter((i) =>
    i.isi.toLowerCase()
  )
)
// onBeforeMount()
onMounted(async ()=>{
  page.value = route.query.page || 0
  getNotePagination()

})
async function getNotePagination(){
  try {
    const response = await axios.post('http://localhost:8000/pagi',{
    skip:page.value*10,
    take:take.value,
    order:"asc",
    });
    data.value = response.data.data
    console.log(response.data);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
async function deleteNote(index,param){
  const response = await axios.delete(`http://localhost:8000/note/${param}`)
  if (response.status==200) {
    
    getNotePagination()
    data.value.splice(index, 1);
    conditionAlert.value = true;
    setTimeout(()=>{
      conditionAlert.value = false
    },3000)
   }
  

}


function nextpage(){
  
  page.value++
  // route.query.page =
  getNotePagination()
  router.push({ path: '/' , query:{page:page.value}})
  
}
function previouspage(){
  if (page.value>0) {
    page.value--
    getNotePagination()
    router.push({ path: '/' ,query:{page:page.value}})
  }
}
function searchNote(){
  console.log("seacrh..");
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
          
          <form class="d-flex mt-2" role="search" >
          <input class="form-control me-2" type="search"  placeholder="Search" aria-label="Search " v-model="search">
          <button class="btn btn-outline-primary" type="button" @click="searchNote" >Search</button>
          </form>
        </div>
        <ul class="list-group mt-4">
          <li class="d-flex justify-content-between align-items-center list-group-item" v-for="(item, index) in filtered" :key="item.id">
           {{ page*10+index+1 }}<div class="col-2 text-truncate">{{ item.isi }}</div>
            <div>
            <router-link :to="{ name:'edit', params: { id: item.id }}"><button @click="editNote" type="button" class="btn btn-success me-2">edit</button></router-link>
            <button  @click.prevent="deleteNote(index,item.id)" type="button" class="btn btn-danger me-2" >delete</button>
            </div>  
          </li>
        </ul>
        
      </div>
      
      <!-- <button  @click="tesNote" type="button" class="btn btn-danger me-2" >testing</button> -->


  
    </div>
    <div class="d-flex justify-content-center mt-5">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                      <a @click.prevent="previouspage" class="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                      </a>
                        </li >
                            <li class="page-item"><a class="page-link" href="#">{{ page }}</a></li>
                            
                        <li class="page-item">
                      <a @click.prevent="nextpage" class="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                </ul>
            </nav>
        </div>
</template>
