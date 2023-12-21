const { Op } = require("sequelize")
const { Movie, User, Profile, Genre, MovieGenre } = require("../models")


class Controller {
    static async showHome(req, res) {
        try {
            const { username } = req.session
            let user;
            if (username) {
                user = await User.findOne({
                    where: {
                        username
                    },
                    include: Profile
                })
            }
        
            res.render('home', { username, user })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async showMovies(req, res) {
        try {
            let movies = await Movie.findAll({
                order: [['movieName', 'asc']],
                include: [{ model: Genre, through: MovieGenre }]
            })
            console.log(movies[0].Genres)
            res.render('movies', { movies })
        } catch (error) {
            res.send(error)
        }
    }

    static async addProfile(req, res) {
        try {
            res.render('addProfile')
        } catch (error) {
            res.send(error)
        }
    }

    static async handleAddProfile(req, res) {
        try {
            const { name, description, avatarUrl } = req.body
            let user = await User.findOne({
                where: {
                    username: req.session.username
                }
            })
            await Profile.create({name, description, avatarUrl, upvotes: 0, UserId: user.id})
            res.redirect('/')
        } catch (error) {
            res.send(error)
        }
    }

    static async showProfile(req, res) {
        try {
            const { id } = req.params
            const { username } = req.session
            let profile = await Profile.findOne({
                where: {
                    id
                }
            })
            // console.log(profile)
            res.render('profile', { username, profile })
        } catch (error) {
            res.send(error)
        }
    }

    static async profileUpvote(req, res) {
        try {
            const { id } = req.params
            await Profile.increment({upvotes: 1}, {
                where: {
                    id
                }
            })
            res.redirect(`/profile/${id}`)
        } catch (error) {
            res.send(error)
        }
    }

    static async renderAddComment(req, res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller