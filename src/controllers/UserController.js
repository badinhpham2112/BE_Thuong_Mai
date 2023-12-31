const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

const createUser = async(req, res) => {
    try {

        const { name, email, password, confirmPassword, phone } = req.body
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        const isCheckEmail = regex.test(email)
        if (!email || !password || !confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the input is email'
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the password is equal confirmPassword'
            })
        }

        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(404).json({
            message: error.e
        })

    }
}
const loginUser = async(req, res) => {
    try {

        const { email, password } = req.body
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        const isCheckEmail = regex.test(email)
        if (!email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the input is email'
            })
        }

        const response = await UserService.loginUser(req.body)
        const { refresh_token, ...newResponse } = response
        res.cookie('refresh_token', refresh_token, {
            HttpOnly: true,
            Secure: false,
            samesite: 'strict',
            path: '/',
        })
        return res.status(200).json({...newResponse, refresh_token })

    } catch (error) {
        return res.status(404).json({
            message: error.e
        })

    }
}


const updateUser = async(req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the userId is required'
            })
        }
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(404).json({
            message: error.e
        })

    }
}


const deleteUser = async(req, res) => {
    try {
        const userId = req.params.id

        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the userId is required'
            })
        }
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(404).json({
            message: error.e
        })

    }
}

const getAllUser = async(req, res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)

    } catch (error) {
        return res.status(404).json({
            message: error.e
        })

    }
}


const getDetailsUser = async(req, res) => {
    try {
        const userId = req.params.id;

        if (!userId || userId.trim() === '') {
            return res.status(400).json({
                status: 'ERR',
                message: 'userId is required and cannot be empty'
            });
        }

        const response = await UserService.getDetailsUser(userId);

        if (!response) {
            return res.status(404).json({
                status: 'ERR',
                message: 'User not found'
            });
        }

        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: error.message
        });
    }
};

const refreshToken = async(req, res) => {
    try {
        let token = req.headers.token.split(' ')[1]
        if (!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the token is required'
            })
        }
        const response = await JwtService.refreshTokenJWTService(token)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(404).json({
            message: error.e
        })

    }
}


const logoutUser = async(req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: ok,
            message: 'Logout successfully'
        })


    } catch (error) {
        return res.status(404).json({
            message: error.e
        })

    }
}

const deleteMany = async(req, res) => {
    try {
        const ids = req.body

        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the ids is required'
            })
        }
        const response = await UserService.deleteManyUser(ids)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(404).json({
            message: error.e
        })

    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logoutUser,
    deleteMany
}