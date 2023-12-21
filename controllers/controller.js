const { Op } = require("sequelize")
const { Movie, User, Profile, Genre, MovieGenre, Comment } = require("../models")
const dateFormat = require("dateformat");
const numberFormat = require("../../helpers/numberFormat");

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
            const { username } = req.session
            const { search } = req.query
            let user;
            if (username) {
                user = await User.findOne({
                    where: {
                        username
                    },
                    include: Profile
                })
            }

            let movies = await Movie.findAll({
                order: [['movieName', 'asc']],
                include: [{ model: Genre, through: MovieGenre }]
            })
            movies = await Movie.searchByName(Genre, MovieGenre, search)
            
            let genres = await Genre.findAll()
            res.render('movies', { movies, genres, username, user })
        } catch (error) {
            res.send(error)
        }
    }

    static async addMovieToList(req, res) {
        try {
            const { movieId } = req.params

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
                },
                include: [Comment]
            })
            console.log(profile)
            res.render('profile', { username, profile, dateFormat, numberFormat })
        } catch (error) {
            console.log(error)
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
            const { id } = req.params
            res.render('addComment', { id })
        } catch (error) {
            res.send(error)
        }
    }

    static async handleAddComment(req, res) {
        try {
            const { id } = req.params
            const { title, content, imgUrl } = req.body
            let result = await Comment.create({title, content, imgUrl, ProfileId: id})
            // console.log(result)
            res.redirect(`/profile/${id}`)
        } catch (error) {
            res.send(error)
        }
    }

    static async handleDeleteComment(req, res) {
        try {
            const { id, commentId } = req.params
            await Comment.destroy({
                where: {
                    id: commentId
                }
            })
            res.redirect(`/profile/${id}`)
        } catch (error) {
           res.send(error) 
        }
    }

    static async renderEditComment(req, res) {
        try {
            const { id, commentId } = req.params
            let comment = await Comment.findByPk(commentId)
            // console.log(comment)
            res.render('editComment', { id, comment })
        } catch (error) {
            res.send(error)
        }
    }

    static async handleEditComment(req, res) {
        try {
            const { id, commentId } = req.params
            const { title, content, imgUrl } = req.body
            await Comment.update({
                title, content, imgUrl
            }, {
                where: {
                    id: commentId
                }
            })
            res.redirect(`/profile/${id}`)
        } catch (error) {
            res.send(error)  
        }
    }
}

module.exports = Controller