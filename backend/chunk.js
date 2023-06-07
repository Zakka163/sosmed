const prisma = require('./prisma/index.js')
const casual = require('casual')
const post = async ()=>{

    for (let index = 0; index < 10000; index++) {
        await prisma.note.create({
            data:{
                id:casual.uuid,
                nama:casual.name

            }
        })
        console.log("post...");
    }

}
const get = async ()=>{
    const data = await prisma.note.findMany({
        // where: {
        //     nomor:2
        //   },
    })
    console.log('get..',data);
    
}
const delet = async ()=>{
    const data = await prisma.note.deleteMany({})
    console.log("delete..",data);
    
}
// delet()
post()
// get()