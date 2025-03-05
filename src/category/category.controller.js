import Category from "./category.model.js"

export const createCategory = async(req, res) => {
    try {
        const data = req.body

        const category = await Category.create(data)
        return res.status(201).json({
            message: "Categoría creada",
            category
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            message: "Error al crear la categoría",
            error: err.message
        })
    }
}

export const listCategories = async(req, res) => {
    try{
        const { from = 0} = req.query
        const query = {status: true}

        const [ total, categories ] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .skip(Number(from))
        ])

        return res.status(200).json({
            success: true,
            total,
            categories
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al listar los usuarios",
            error: err.message
        })
    }
}

export const editCategory = async(req, res) => {
    try {
        const { uid } = req.params
        const data = req.body
        
        const category = await Category.findByIdAndUpdate( uid, data, { new: true })

        return res.status(200).json({
            success: true,
            message: "Categoría actualizada",
            category

        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la categoría",
            error: err.message
        })
    }
}

export const deleteCategory = async(req, res) => {
    try{
        const { uid } = req. params

        const category =  await Category.findByIdAndDelete(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Categoría eliminada exitosamente",
            category
        })
    
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la categoría",
            error: err.message
        })
    }
}