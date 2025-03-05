import { Schema, model } from "mongoose";

const billDetailSchema = Schema({
    bill: {
        type: Schema.Types.ObjectId,
        ref: "Bill",
        required: [true, "Bill reference is required"]
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product is required"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        default: 1
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    subtotal: {
        type: Number,
        required: [true, "Total price is required"]
    }
}, {
    versionKey: false,
    timestamps: true
});

export default model("BillDetail", billDetailSchema);