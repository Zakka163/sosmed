<script setup>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router'


const route = useRoute()
const router = useRouter()
const conversation = reactive([
    { "pesan": "halo", "send": true },
    { "pesan": "2", "send": false },
    { "pesan": "hai", "send": false },
    { "pesan": "halo", "send": true },
    { "pesan": "3", "send": false },


])

function backpage(){
    router.back()
}

</script>

<template>
    <div class="container">
        <div><button @click="backpage" type="button" class="btn btn-warning">BACK</button></div>
        <div class="container py-3 mt-2">
            <div class="row d-flex justify-content-center ">
                <div class="card" id="chat1" style="border-radius: 15px;">
                    <!-- conversation -->
                    <div class="card-body " v-for="pesan in conversation">
                        <!-- kondisi -->
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



                    <!-- send -->
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

        </div>
    </div>
</template>