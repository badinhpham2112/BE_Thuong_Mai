const Comment = require('../modals/Comment');

const createComment = async(newComment) => {
    return new Promise(async(resolve, reject) => {
        const { comment, user, name, avatar, product } = newComment;
        try {
            const newCreateComment = await Comment.create({
                comment,
                user: user,
                product: product,
                name,
                avatar
                // parentId
            })
            if (newCreateComment) {
                resolve({
                    status: 'OK',
                    message: 'success',
                    data: newCreateComment

                })
            }
        } catch (e) {
            reject(e)

        }

    })

};

// const getAllComment = (product) => {
//         return new Promise(async(resolve, reject) => {
//             try {
//                 const checkProductId = await Comment.findOne({
//                     productId: product
//                 })

//                 if (checkProductId === null) {
//                     resolve({
//                         status: 'OK',
//                         message: 'The user is not defined'
//                     })

//                 }

//                 const allComment = await Comment.find(product)
//                 resolve({
//                     status: 'OK',
//                     message: 'Success',
//                     data: allComment
//                 })
//             } catch (e) {
//                 reject(e)

//             }
//         })
//     }

const getAllComment = (product) => {
    return new Promise(async(resolve, reject) => {
        try {
            const checkProductId = await Comment.findOne({
                productId: product
            });

            if (checkProductId === null) {
                resolve({
                    status: 'OK',
                    message: 'Không tìm thấy bình luận nào cho sản phẩm này'
                });
            } else {
                const allComments = await Comment.find({ productId: product });
                return allComments
                    // resolve({
                    //     status: 'OK',
                    //     message: 'Lấy tất cả bình luận thành công',
                    //     data: allComments
                    // });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createComment,
    getAllComment
};