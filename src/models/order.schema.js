import mongoose from "mongoose";
import OrderStates from "../utils/orderStates";

const orderSchema = new mongoose.Schema(
    {
        product: {
            type: [
                {
                    productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Product"
                    },
                    count: Number,
                    price: Number
                }
            ],
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        amount: {
            type: String,
            required: true
        },
        coupon: String,
        transactionId: String,
        status: {
            type: String,
            enum: Object.values(OrderStates),
            default: OrderStates.ordered
        }
    }
,{timestamps: true})


export default mongoose.model("Order", orderSchema)