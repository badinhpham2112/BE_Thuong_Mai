const OrderSevice = require('../services/OrderService');

const createOrder = async(req, res) => {
    try {
        const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, isPaid, paidAt } = req.body

        if (!paymentMethod || !itemsPrice || !totalPrice || !fullName || !address || !city || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the input is required'
            })
        }

        const response = await OrderSevice.createOrder(req.body)
        return res.status(200).json(response)

    } catch (error) {
        console.log(error)
        return res.status(404).json({
            message: error.e
        })

    }

}

const getAllOrder = async(req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the userId is required'
            })
        }
        const response = await OrderSevice.getAllOrder(userId)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(404).json({
            message: error.e
        })

    }

}

const getDetailsOrder = async(req, res) => {
    try {
        const orderId = req.params.id
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the userId is required'
            })
        }
        const response = await OrderSevice.getDetailsOrder(orderId)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(404).json({
            message: error.e
        })

    }

}


const CancelOrder = async(req, res) => {
    try {
        const orderId = req.body.orderId;

        const data = req.body.orderItems;
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the userId is required'
            })
        }
        const response = await OrderSevice.CancelOrder(orderId, data)


        return res.status(200).json(response)

    } catch (error) {
        return res.status(404).json({
            message: error.e
        })

    }

}



const getAllOrderUser = async(req, res) => {
    try {
        const data = await OrderSevice.getAllOrderUser()

        return res.status(200).json(data)

    } catch (error) {
        return res.status(404).json({
            message: error.e
        })

    }

}




module.exports = {
    createOrder,
    getAllOrder,
    getDetailsOrder,
    CancelOrder,
    getAllOrderUser

}