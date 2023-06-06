const cors = require('cors')
const express = require('express')
const {getNoteAll,postNote,getNote, deleteNote, updateNote, getNotePagination} = require('../controller')

const route = express.Router();


route.get('/note/:id', getNote)
route.get('/note', getNoteAll)
route.post('/note', postNote)
route.delete('/note/:id',deleteNote)
route.put('/note/:id',updateNote)


route.post('/pagi', getNotePagination)



module.exports = route