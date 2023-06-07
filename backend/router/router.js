const cors = require('cors')
const express = require('express')
const {getNoteAll,postNote,getNote, deleteNote, updateNote, getNotePagination, searchNote, getNoteScrolling} = require('../controller')

const route = express.Router();


route.get('/note/:id', getNote)
route.get('/note', getNoteAll)
route.post('/note', postNote)
route.delete('/note/:id',deleteNote)
route.put('/note/:id',updateNote)

route.get('/search',searchNote)
route.post('/pagi', getNotePagination)
route.get('/note-scrol',getNoteScrolling)



module.exports = route