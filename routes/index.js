const {Router} = require('express')
const indexController = require('../controllers/indexController')
const router = Router()

router.get('/', indexController.ping)
router.get('/user', indexController.getUsers)
router.get('/user/:id', indexController.getUserById)
router.post('/user', indexController.createUser)
router.put('/user/:id', indexController.updateUser)
router.delete('/user/:id', indexController.deleteUsers)

module.exports = router