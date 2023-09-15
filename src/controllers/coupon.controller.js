import Coupon from "../models/coupon.schema.js"
import asyncHandler from "../service/asyncHandler.js"
import CustomError from "../utils/CustomError.js"

export const createCoupon = asyncHandler(async(req, res) => {
    const {code, discount} = req.body

    if(!code || !discount){
        throw new CustomError("Code and discount are required", 400)
    }

    const coupon = await Coupon.create({
        code,
        discount
    })

    res.status(200).json({
        success: true,
        message: "coupon was created successfully",
        coupon
    })

})

export const getAllCoupon = asyncHandler(async(req, res) => {
    const coupons = await Coupon.find({})

    if (!coupons) {
        throw new CustomError("No coupon is present", 400)
    }
    res.status(200).json({
        success: true,
        coupons
    })
})

export const updateCoupon = asyncHandler(async(req, res) => {
    const {action} = req.body
    const {id: couponId} = req.params

    if(!code || !discount){
        throw new CustomError("code or discount requires", 400)
    }

    const coupon = Coupon.findByIdAndUpdate(couponId, {
        active: action
    },{
        new: true,
        runValidators: true
    })

    if (!updateCoupon) {
        throw new CustomError("Coupon not found", 404)
    }

    res.status(200).json({
        success: true,
        message: "Coupon was updated successfully",
        coupon
    })
})

export const deleteCoupon = asyncHandler(async(req, res)=> {
    const {id: couponId} = req.params

    const coupon = await Coupon.findByIdAndDelete(couponId)

    if(!coupon){
        throw new CustomError("Coupon is not found", 404)
    }

    res.status(200).json({
        success: true,
        message: "coupon deleted successfully"
    })
    
})