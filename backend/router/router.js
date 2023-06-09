const express = require('express')
const {getNoteAll,postNote,getNote, deleteNote, updateNote, getNotePagination, searchNote, getNoteScrolling, uploadHandler} = require('../controller')

const route = express.Router();
const multer =require('multer')
const diskStorage = require('../middleware/multer.js')



route.get('/note/:id', getNote)
route.get('/note', getNoteAll)
route.post('/note', postNote)
route.delete('/note/:id',deleteNote)
route.put('/note/:id',updateNote)

route.get('/search',searchNote)
route.post('/pagi', getNotePagination)
route.get('/note-scrol',getNoteScrolling)


route.put('/upload',multer({ storage: diskStorage }).single("photos"),uploadHandler)


module.exports = route

