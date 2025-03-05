import Shopping from "./shopping.model.js"
import Product from "../product/product.model.js"

export const addCart = async (req, res) => {
    try {
        const data = req.body

        //Buscar producto
        const product = await Product
            .findById(data.product);

        if (!product) {
            return res.status(404).json({
                message: "Producto no existe"
            })
        }

        //Calcular total
        const totalPrice = data.quantity * product.price;

        //Crear item
        let item = {
            product: data.product,
            quantity: data.quantity,
            totalPrice: totalPrice, 
            user: data.user._id.toHexString()
        }

        const addCart = await Shopping.create(item)
        return res.status(201).json({
            message: "Productos agregados al carrito",
            addCart
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            message: "Error al agregar productos al carrito",
            error: err.message
        })
    }
}

export const listCartByClient = async (req, res) => {
    try {
        const { uid_client } = req.params
        const data = req.body
        
        if (data.user._id.toHexString() !== uid_client) {
            return res.status(401).json({
                success: false,
                message: "No tienes permisos para visualizar el carrito de este usuario"
            });
        }

        const addCart = await Shopping.find({ user: uid_client, status: true })
        .populate({
            path: "product",
            select: "productName price stock"
        })
        .populate({
            path: "user",
            select: "name email"
        })
        return res.status(200).json({
            success: true,
            addCart
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            message: "Error al listar los productos del carrito",
            error: err.message
        })
    }
}