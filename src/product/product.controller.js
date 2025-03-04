import Product from "./product.model.js"

export const registerProduct = async (req, res) => {
    try {
        const data = req.body

        const product = await Product.create(data)
        return res.status(201).json({
            message: "Producto registrado",
            product
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            message: "Registro del producto fallido",
            error: err.message
        })
    }
}

export const listProducts = async (req, res) => {
    try {
        const { from = 0 } = req.query
        const query = { status: true }

        const { total, products } = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .skip(Number(from))
        ])

        return res.status(200).json({
            success: true,
            total,
            products
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al listar los productos",
            error: err.message
        })
    }
}

export const findProductById = async (req, res) => {
    try {
        const { uid } = req.params
        const product = await Product

        if (!product) {
            res.status(404).json({
                success: false,
                message: "Producto no existe",
                error: err.message
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el producto",
            error: err.message
        })
    }
}

export const editProduct = async (req, res) => {
    try {
        const { uid } = req.params
        const data = req.body

        const product = await Product.findByIdAndUpdate(uid, data, { new: true })

        res.status(200).json({
            success: true,
            message: "Producto actualizado",
            product
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el producto",
            error: err.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { uid } = req.params

        const product = await Product.findByIdAndUpdate(uid, { status: false }, { new: true })

        res.status(200).json({
            success: true,
            message: "Producto eliminado exitosamente",
            product
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el producto",
            error: err.message
        })
    }
}