const User = require('../modals/UserModel')
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService');

const createUser = (newUser) => {
    return new Promise(async(resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The email is already'
                })
            }
            const hash = await bcrypt.hash(password, 10)

            const createUser = await User.create({
                name,
                email,
                password: hash,
                confirmPassword: hash,
                phone
            })
            if (createUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createUser
                })

            }



        } catch (e) {
            reject(e)

        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async(resolve, reject) => {
        const { email, password } = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'Người dùng không tông tại!.'
                })
            }
            const conparePassword = bcrypt.compareSync(password, checkUser.password)

            if (!conparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The password or user is incorrect'
                })
            }

            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token

            })

            // }


        } catch (e) {
            reject(e)

        }
    })
}


const updateUser = (id, data) => {
    return new Promise(async(resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            });
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }

            const updateUser = await User.findByIdAndUpdate(id, data, { new: true })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateUser


            })

            // }


        } catch (e) {
            reject(e)

        }
    })
}

const deleteUser = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            });
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }

            await User.findByIdAndDelete(id)

            resolve({
                status: 'OK',
                message: 'Delete user Success',


            })

            // }


        } catch (e) {
            reject(e)

        }
    })
}

const getAllUser = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const allUser = await User.find()

            resolve({
                status: 'OK',
                message: 'Success',
                data: allUser

            })

            // }


        } catch (e) {
            reject(e)

        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            });
            if (user === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: user


            })

            // }


        } catch (e) {
            reject(e)

        }
    })
}


const deleteManyUser = (ids) => {
    return new Promise(async(resolve, reject) => {
        try {
            await User.deleteMany({ _id: ids })

            resolve({
                status: 'OK',
                message: 'Delete ids Success',


            })

            // }


        } catch (e) {
            reject(e)

        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    deleteManyUser
}