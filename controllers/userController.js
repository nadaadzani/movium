const bcrypt = require('bcryptjs')
const { User } = require('../models')
class UserController {
    static async showRegister(req, res) {
        try {
            const { errors } = req.query
            let error = errors?.split(',')
            res.render('register', { error })
        } catch (error) {
            res.send(error)
        }
    }

    static async handleRegister(req, res) {
        try {
            const { username, password, role } = req.body
            
            await User.create({username, password, role})
            res.redirect('/login')
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                let errors = error.errors.map(el => {
                    return el.message
                })
                res.redirect(`/register?errors=${errors}`)
            } else {
                res.send(error)
                console.log(error)
            }
        }
    }

    static async showLogin(req, res) {
        try {
            const { error } = req.query
            res.render('login', { error })
        } catch (error) {
            res.send(error)
        }
    }

    static async handleLogin(req, res) {
        try {
            const { username, password } = req.body
            let user = await User.findOne({
                where: {
                    username
                }
            })
            if (user) {
                const validPassword = bcrypt.compareSync(password, user.password);
                if (validPassword) {
                    req.session.username = user.username
                    return res.redirect('/')
                } else {
                    let error = `Invalid username or password..`
                    return res.redirect(`/login?error=${error}`)
                }
            }
            let error = `Invalid username or password..`
            res.redirect(`/login?error=${error}`)
        } catch (error) {
            res.send(error)
        }
    }

    static async handleLogout(req, res) {
        try {
            req.session.destroy()
            res.redirect('/')
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
}

module.exports = UserController