import Bill from "./bill.model.js"
import Shopping from "../shoppingCart/shopping.model.js"
import BillDetail from "../billDetail/billDetail.model.js"
import Product from "../product/product.model.js"

export const addBill = async (req, res) => {
    try {
        const data = req.body

        // Validar si el usuario tiene productos en el carrito
        const emptyCart = await Shopping.find({ user: data.user._id.toHexString(), status: true })
        if (emptyCart.length === 0) {
            return res.status(400).json({
                message: "No tienes productos en el carrito"
            })
        }
        
        //Crear factura
        let bill = {
            total: 0,
            date: new Date(),
            user: data.user._id.toHexString()
        }

        // Crear factura
        const addBill = await Bill.create(bill);

        const cart = await Shopping.find({ user: data.user._id.toHexString(), status: true })
        .populate({
            path: "product",
            select: "productName price stock"
        });

        //Validar stock en tienda
        for (const item of cart) {
            if (item.quantity > item.product.stock) {
                return res.status(400).json({
                    message: `No hay suficiente stock de ${item.product.productName}`
                })
            }
        }
        
        for (const item of cart) {
            bill.total += item.totalPrice
            console.log(item)
            
            // Crear detalle factura
            let detail = {
                bill: addBill._id.toHexString(),
                product: item.product._id.toHexString(),
                quantity: item.quantity,
                price: item.product.price,
                subtotal: item.totalPrice,
            }

            await BillDetail.create(detail);

            // Restar compra al stock
            await Product.findByIdAndUpdate(item.product._id,
                { stock: item.product.stock - item.quantity },
                { new: true });
        }

        // Actualizar total factura
        await Bill.findByIdAndUpdate(addBill._id, { total: bill.total }, { new: true });

        // Vaciar carrito
        await Shopping.updateMany({ user: data.user._id.toHexString(), status: true }, { status: false });

        return res.status(201).json({
            message: "Factura agregada",
            addBill
        })

    } catch (err) {
        return res.status(500).json({
            message: "Error al agregar la factura",
            error: err.message
        })
    }
}

export const listBillByClient = async (req, res) => {
    try {
        const { uid_client } = req.params;
        const data = req.body;

        if (data.user._id.toHexString() !== uid_client) {
            return res.status(401).json({
                success: false,
                message: "No tienes permisos para visualizar la factura de este usuario"
            });
        }

        // Obtener facturas del cliente
        const bills = await Bill.find({ user: uid_client, status: true })
        .populate({
            path: "user",
            select: "name email"
        });

        // Obtener detalles de la factura
        const billsWithDetails = await Promise.all(
            bills.map(async (bill) => {

            const details = await BillDetail.find({ bill: bill._id.toHexString() })
            .populate({
                path: "product",
                select: "productName price"
            });

            const detailParsed = details.map((detail) => ({
                uid_detail: detail._id,
                productName: detail.product.productName, 
                price: detail.price, 
                quantity: detail.quantity, 
                subtotal: detail.subtotal
            }));
        
            return {
                uid: bill._id,
                user_name: bill.user.name,
                user_email: bill.user.email,
                user_uid: bill.user._id,
                date: bill.date,
                detail: detailParsed
            };
        }));

        return res.status(200).json({
            success: true,
            billsWithDetails
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al listar la factura",
            error: err.message
        });
    }
};


