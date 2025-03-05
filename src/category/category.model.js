import {Schema, model} from "mongoose"

const categorySchema = Schema({
    categoryName:{
        type: String,
        required: [true, "Category name is required"],
        maxLength:[25, "Category name cannot exceed 25 characters"]
    },
    description:{
        type: String,
        maxLength:[50, "Description cannot exceed 50 characters"]
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

export default model("Category", categorySchema)