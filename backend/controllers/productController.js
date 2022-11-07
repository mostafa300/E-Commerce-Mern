import e from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    // throw new Error('Product not found');
    res.json(products)
})


const getProductById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        throw new Error('Product not found');
    }
})


export { getProducts, getProductById }