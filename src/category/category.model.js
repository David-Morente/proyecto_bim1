import {Schema, model} from "mongoose"

const categorySchema = Schema({
    nameCategory:{
        type: String,
        required: [true, "Name category is required"],
        maxLength:[25, "Name category cannot exceed 25 characters"]
    },
    description:{
        type: String,
        required: [true, "Description is required"],
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