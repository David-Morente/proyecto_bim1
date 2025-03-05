import {Schema, model} from "mongoose"

const userSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength:[25, "Name cannot exceed 25 characters"]
    },
    surname:{
        type: String,
        required: [true, "Name is required"],
        maxLength:[25, "Name cannot exceed 25 characters"]
    },
    password:{
        type: String,
        required: true,
        minLength: 8
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    preferences:{
        type: String
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "CLIENT_ROLE"],
        default: "CLIENT_ROLE"
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

userSchema.methods.toJSON = function(){
    const { password, _id, ...user } = this.toObject()
    user.uid = _id
    return user
}

export default model("User", userSchema)