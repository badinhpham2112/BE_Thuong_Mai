const CommentService = require('../services/CommentService');

const createComment = async(req, res) => {
    const { comment, user, name, avatar, product } = req.body;
    try {
        if (!comment || !user || !name || !product) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the input is required'
            })

        }
        const newComment = await CommentService.createComment(req.body);
        res.status(200).json(newComment);
    } catch (error) {
        return res.status(404).json({
            message: error.e
        });
    }
};

const getAllComment = async(req, res) => {
    try {
        const product = req.params.id;
        if (!product) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the productId is required'
            })
        }

        const response = await CommentService.getAllComment(product)
        return res.status(200).json(response);

    } catch (error) {
        return res.status(404).json({
            message: error.e
        })

    }
}

// const CommentService = require('./commentService');

// const getCommentsByProduct = async (req, res) => {
//     try {
//         const productId = req.params.productId;
//         const comments = await CommentService.getCommentsByProduct(productId);
//         res.status(200).json(comments);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

module.exports = {
    getCommentsByProduct
};


module.exports = {
    createComment,
    getAllComment
};