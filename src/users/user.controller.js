import { hash, verify } from "argon2"
import User from "./user.model.js"

export const getUserById = async(req, res) => {
    try{
        const { uid } = req.params;
        const user = await User.findById(uid)

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Usuario no existe",
                error: err.message
            })
        }

        return res.status(200).json({
            success: true,
            user
        })

    } catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: err.message
        })
    }
}

export const getUsers = async(req, res) => {
    try{
        const { limits = 3, from = 0} = req.query
        const query = {status: true}

        const [ total, users ] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(from))
                .limit(Number(limits))
        ])

        return res.status(200).json({
            success: true,
            total,
            users
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al listar los usuarios",
            error: err.message
        })
    }
}

export const deleteUser = async (req, res) => {
    try{
        const { uid } = req. params

        const user =  await User.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Usuario Eliminado",
            user
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        })
    }
}

export const updatePassword = async (req, res) => {
    try{
        const { uid } = req.params
        const { newPassword, oldPassword } =  req.body

        const user = await User.findById(uid)

        const validatePassword = await verify(user.password, oldPassword)

        if(validatePassword == false){
            return res.status(400).json({
                success: false,
                message: "Ingrese la contraseña antigua correctamente."
            })
        }

        const matchPassword = await verify(user.password, newPassword)

        if(matchPassword){
            return res.status(400).json({
                success: false,
                message: "La contraseña nueva no debe de ser igual a la anterior."
            })
        }
        
        const encryptedPassword = await hash(newPassword)

        await User.findByIdAndUpdate(uid, {password: encryptedPassword})

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada"
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const  data  = req.body;

        const user = await User.findByIdAndUpdate(uid, data, { new: true });

        const validatePassword = await verify(user.password, data.password)

        if(validatePassword){
            return res.status(400).json({
                success: false,
                message: "Ingrese su contraseña actual para actualizar sus datos"
            })
        }

        res.status(200).json({
            success: true,
            message: "Usuario actualizado",
            user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el usuario',
            error: err.message
        });
    }
}