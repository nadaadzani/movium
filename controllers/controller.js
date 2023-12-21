const { Op } = require("sequelize")
const { Movie, User, Profile } = require("../models")


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
            // console.log(user)
        

            res.render('home', { username, user })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async showMovies(req, res) {
        try {
            let movies = await Movie.findAll({
                order: [['movieName', 'asc']]
            })
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
            const { username } = req.session
            res.render('profile', { username })
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller