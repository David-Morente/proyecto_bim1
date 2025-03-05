import BillDetail from "./billDetail.model.js";
import Product from "../product/product.model.js";

export const updateBill = async(req, res) => {
    try {
        const { uid } = req.params
        const data = req.body
        
        const billDetail = await BillDetail.findById(uid, data, { new: true })

        if (!billDetail) {
            return res.status(404).json({
                success: false,
                message: "Detalle de la factura no existe"
            })
        }

        const updateBillDetail = await BillDetail.findByIdAndUpdate(uid, data, { new: true })

        return res.status(200).json({
            success: true,
            message: "Factura actualizada",
            updateBillDetail

        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la factura",
            error: err.message
        })
    }
}