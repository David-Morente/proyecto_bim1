import {Schema, model} from "mongoose"

const productSchema = Schema({
    productName:{
        type: String,
        required: [true, "Product name is required"],
        maxLength:[25, "Product name cannot exceed 25 characters"]
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        maxLength:[50, "Description cannot exceed 50 characters"]
    },
    price:{
        type: Number,
        required: [true, "Price is required"]
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    stock:{
        type: Number,
        required: [true, "Stock is required"]
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

export default model("Product", productSchema)