import {Schema, model} from "mongoose"

const shoppingSchema = Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product is required"]
    },
    quantity:{
        type: Number,
        required: true,
        default: 1
    },
    totalPrice:{
        type: Number,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Shopping", shoppingSchema)