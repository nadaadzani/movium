const Controller = require('../controllers/controller')
const UserController = require('../controllers/userController')
const router = require('express').Router()

router.get('/register', UserController.showRegister)
router.post('/register', UserController.handleRegister)
router.get('/login', UserController.showLogin)
router.post('/login', UserController.handleLogin)
router.get('/logout', UserController.handleLogout)
router.get('/', Controller.showHome)

router.use((req, res, next) => {
    if (req.session.username) {
        next() 
    } else {
        let error = `You haven't logged in!`
        res.redirect(`/login?error=${error}`)
    }
})

router.get('/movies', Controller.showMovies)
router.get('/profile/add', Controller.addProfile)
router.post('/profile/add', Controller.handleAddProfile)
router.get('/profile/comments')
router.post('/profile/comments')
router.get('/profile/:id', Controller.showProfile)
router.get('/profile/:id/upvote', Controller.profileUpvote)

module.exports = router