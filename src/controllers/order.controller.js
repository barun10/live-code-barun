import Product from "../models/product.schema.js"
import Coupon from "../models/coupon.schema.js"
import Order from "../models/order.schema.js"
import asyncHandler from "../service/asyncHandler.js"
import CustomError from "../utils/CustomError.js"
import razorpay from "../config/razorpay.config.js"

export const generateRazorpayOrderId = asyncHandler(async(req, res) => {
    const {products, couponCode} = req.body

    if(!products || products.length === 0){
        throw new CustomError("No products were found", 400)
    }

    let totalAmount = 0
    let discountAmount = 0

    let productPriceCalc = Promise.all(
        products.map(async (product) => {
            const { productId, count } = product;
            const productFromDB = await Product.findById(productId)
            if (!productFromDB.stock < count) {
                return res.status(400).json({
                    error: "Product quantity is not in stock"
                })
            }
            totalAmount += productFromDB.price * count
        })
    )

    await productPriceCalc;

    //todo check for product discount if applicable
    const options = {
        amount: Math.round(totalAmount * 100),
        currency: "INR",
        receipt: `receipt_${new Date().getTime() }`
    }

    const order = await razorpay.orders.create(options)

    if(!order){
        throw new CustomError("Unable to generate order", 400)
    }

    res.status(200).json({
        success: true,
        message: "Razorpay order id generated successfully",
        order
    })
})

// Todo : add order in db and update in product stock 

export const generateOrder = asyncHandler(async(req, res) => {
    //
})

// Todo : get only my orders

export const getMyorders = asyncHandler(async(req, res) => {

})

// Todo : get all my orders: ADMIN

export const getAllOrders = asyncHandler(async(req, res) => {

})

// Todo : update order staus

export const updateOrderStatus = asyncHandler(async(req, res) => {

})