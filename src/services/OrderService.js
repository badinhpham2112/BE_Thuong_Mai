const Order = require('../modals/OderProduct');
const Product = require("../modals/ProductModel");

const createOrder = (newOrder) => {
    return new Promise(async(resolve, reject) => {
        const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, user, isPaid, paidAt } = newOrder;
      
        try {  
            const promises = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate({
                    _id: order?.product,
                    countInStock: {$gte: order?.amount}
                    },
                   
                    {$inc: {
                        countInStock: -order?.amount,
                        selled: +order?.amount
                    }},
                    {new: true}
                )
              

                

                if (productData) {
                  return {
                    status: 'OK',
                    message: 'SUCCESS'
                  }

                } else {
                    return {
                        status: 'OK',
                        message: 'ERR',
                        id: order?.product,

                    }
                }
             

            }) 
            const results = await Promise.all(promises);
           
        

            const newData = results && results.filter((item) => item.id);
            if(newData.length){
                const arrId = []
                newData.forEach((item) => {
                    arrId.push(item.id)
                })
                resolve({
                    status: 'ERR',
                    message: `Sản phẩm với id${arrId.join(',')} Không đủ hàng`
                })
            }else{
                const newcreateOrder = await Order.create({
                    orderItems,
                    shippingAddress: {
                        fullName,
                        address,
                        city,
                        phone,
                
                    },
                    user: user,
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    totalPrice,
                    isPaid, paidAt
                
                
                })
                if (newcreateOrder) {
                    resolve({
                        status: 'OK',
                        message: 'success'
                    })
                }
             
                

            }
            // await EmailService.SendEmailCreateOrder()
            // resolve({
            //     status: 'OK',
            //     message: 'success'
            // })

           

           


        } catch (e) {
        
            reject(e)

        }
    })
}


const getAllOrder = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            const order = await Order.find({
                user: id
            });
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: order


            })

            // }


        } catch (e) {
            reject(e)

        }
    })
}

const getDetailsOrder = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id
            });
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: order


            })

            // }


        } catch (e) {
            reject(e)

        }
    })
}

const CancelOrder = (id, data) => {
    return new Promise(async(resolve, reject) => {
       
        try {
            let order= []
            const promises = data?.map(async (order) => {
          
                const productData = await Product.findOneAndUpdate({
                    _id: order?.product,
                    selled: {$gte: order?.amount}
                    
                    },
                   
                    {$inc: {
                        countInStock: +order?.amount,
                        selled: -order?.amount
                    }},
                    {new: true}
                )
              

              

                if (productData) {
                    order = await Order.findByIdAndDelete(id);

                   if (order === null) {
                     resolve({
                        status: 'ERR',
                        message: 'The order is not defined'
                        })
                    }
                   

                } else {
                    return {
                        status: 'OK',
                        message: 'ERR',
                        id: order?.product,

                    }
                }
             

            }) 
            const results = await Promise.all(promises);
           
        

            const newData = results && results.filter((item) => item.id);
            if(newData.length){
                resolve({
                    status: 'ERR',
                    message: `Sản phẩm với id${newData.join(',')} Không tồn tại`
                })
            }
            resolve({
                status: 'OK',
                message: 'success',
                data: order
            })

           



        } catch (e) {
           
            reject(e)

        }
    })
}

const getAllOrderUser = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const allOrderUser = await Order.find()

            resolve({
                status: 'OK',
                message: 'Success',
                data: allOrderUser

            })

            // }


        } catch (e) {
            reject(e)

        }
    })
}




module.exports = {
    createOrder,
    getAllOrder,
    getDetailsOrder,
    CancelOrder,
    getAllOrderUser
}