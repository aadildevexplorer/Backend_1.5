const express = require('express')
const { createUser, getUsers } = require('../controller/prisma.controller')
// const { createUser, updateUser, getUsers, deleteUser } = require('../controller/userController')
const router = express.Router()

router.post('/create' , createUser)
// router.put('/update/:id' , updateUser)
router.get('/getUser' , getUsers)
// router.delete('/delete/:id' , deleteUser)

module.exports = router
