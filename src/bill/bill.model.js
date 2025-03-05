import {Schema, model} from "mongoose"

const billSchema = Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    date:{
        type: Date,
        required: [true, "Date is required"]
    },
    total:{
        type: Number,
        required: [true, "Total is required"]
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

export default model("Bill", billSchema)