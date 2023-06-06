const prisma = require('../prisma/index.js')



const  getNoteAll = async (req, res) => {
  const data = await prisma.note.findMany()
  console.log(req.body);
  res.json({
    "status":200,
    data
  })
  }
const  postNote = async (req, res) => {
  const data = req.body
  await prisma.note.create({
            data: data,
          })
  res.json({
    "status":200
  })
}
const  getNote = async (req, res) => {
  console.log(req.body);
  const id = req.params.id
  const data = await prisma.note.findMany({
    where: {
      id:parseInt(id)
    },
  })
  res.json({
    "status":200,
    data
  })

}
const  deleteNote = async (req, res) => {
  const id = req.params.id
  const find = await prisma.note.findMany({
    where: {
      id:parseInt(id)
    }
  })
  if (find.length > 0) {
    const deleteNote = await prisma.note.delete({
      where: {
        id:parseInt(id),
      },
    })
    res.json({
      "status":200,
      data:deleteNote
    })
  }else{
    res.json({
      "status":404,
      data:find
    })
  }
}
const  updateNote = async (req, res) => {
  console.log(req.body);
  const data =req.body
  const id = req.params.id
  const find = await prisma.note.findMany({
    where: {
      id:parseInt(id)
    },
  })
  if (find.length > 0 ) {
    const updateNote = await prisma.note.update({
      where: {
        id:parseInt(id)
      },
      data: data,
    })
    res.json({
      "status":200,
      data:updateNote
    })
  }else{
    res.json({
      "status":404,
      data:find
    })
  }
  
  //const post = await prisma.note.update({
  //   where: { id: 1 },
  //   data: { isi:'data diubah' },
  // })
}






module.exports = {getNoteAll,postNote,getNote,deleteNote,updateNote}