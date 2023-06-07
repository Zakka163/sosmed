<script setup>
import axios from 'axios';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const isi = ref(true)
const data = ref([])
const take = ref(15)
const lastNote =ref(0)
const next = ref(true)
const scrollComponent = ref(null)
const keyword = ref()
async function getData(){
    try {
        if (next.value) {
            if (keyword.value!=null) {
                console.log("req dengan search");
                const response=await axios.get(`http://localhost:8000/note-scrol?take=${take.value}&lastNote=${lastNote.value}&search=${keyword.value}`)//
                if (response.data.next) {
                lastNote.value++
                }
                next.value = response.data.next
                response.data.data.forEach(element => {
                    data.value.push(element)
                });
                }else if(keyword.value == null){
                    console.log("req tanpa search");
            const response=await axios.get(`http://localhost:8000/note-scrol?take=${take.value}&lastNote=${lastNote.value}`)//
            if (response.data.next) {
            lastNote.value++
            }
            next.value = response.data.next
            response.data.data.forEach(element => {
                data.value.push(element)
            });
                }
          
            
        }else{
            console.log("mentok....");
        }
    } catch (error) {
        console.log(error);
    }
}
const loadMore=()=>{
    let element = scrollComponent.value
        if(element.getBoundingClientRect().bottom<window.innerHeight){
        getData()
    }
    
}
function searchNote(){
    data.value = []
    next.value = true
    // keyword.value = null
    lastNote.value = 0
    console.log("keyword: "+keyword.value);
    getData()
}
// function stopMore(){
//     next.value = false
// }
onMounted(()=>{
    console.log(window.innerHeight);
    if (data.value.length != 0) {
        isi.value = true
    }
    getData()
    window.addEventListener('scroll',loadMore)
    
    

})
onUnmounted(()=>{
    window.removeEventListener('scroll',loadMore)

})

</script>

<template>
    <div class="container" ref="scrollComponent">
        <form class="d-flex mt-2" role="search" >
              <input class="form-control me-2" type="search"  placeholder="Search" aria-label="Search " v-model="keyword">
              <button class="btn btn-outline-primary" type="button" @click="searchNote" >Search</button>
          </form>
        <div v-if="data.length>0" >
        <ul class="list-group mt-4">
          <li class="d-flex justify-content-between align-items-center list-group-item" v-for="(item, index) in data" :key="item.id">
           {{ index+1 }}<div class="col-2 text-truncate">{{ item.id }}</div>
            <div>
            <!-- <router-link :to="{ name:'home'}"><button type="button" class="btn btn-success me-2"></button></router-link> -->
            <!-- <button  type="button" class="btn btn-danger me-2" >delete</button> -->
            </div>  
          </li>
        </ul>
        </div>
        <div v-else-if="isi" class="text-center mt-5"><h3>DATA KOSONG</h3></div>
    </div>
    <div class=" mt-5"></div>
    <!-- <button @click="stopMore" type="button" class="btn btn-danger me-2" >scroll</button> -->
     
</template>
