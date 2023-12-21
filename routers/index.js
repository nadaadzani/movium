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
router.get('/movies/add/:movieId')
router.get('/profile/add', Controller.addProfile)
router.post('/profile/add', Controller.handleAddProfile)
router.get('/profile/:id', Controller.showProfile)
router.get('/profile/:id/upvote', Controller.profileUpvote)
router.get('/profile/:id/comment/add', Controller.renderAddComment)
router.post('/profile/:id/comment/add', Controller.handleAddComment)
router.get('/profile/:id/delete/:commentId', Controller.handleDeleteComment)
router.get('/profile/:id/edit/:commentId', Controller.renderEditComment)
router.post('/profile/:id/edit/:commentId', Controller.handleEditComment)


module.exports = router