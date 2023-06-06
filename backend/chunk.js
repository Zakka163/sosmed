const prisma = require('./prisma/index.js')
const casual = require('casual')
const post = async ()=>{

    for (let index = 0; index < 10000; index++) {
        await prisma.note.create({
            data: {
                isi:casual.description,
                nama:casual.name,
                penulis:casual.title
            },
        })
        console.log("post...");
    }

}
const get = async ()=>{
    const data = await prisma.note.findMany()
    console.log(data);
    
}
post()
// get()