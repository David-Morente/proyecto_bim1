import { hash, verify } from "argon2"
import argon2 from "argon2"
import User from "./user.model.js"

export const initAdmin = async () => {
    try {
        const adminExist = await User.findOne({ role: 'ADMIN_ROLE' });
        if (!adminExist) {
            const hashedPassword = await argon2.hash('adminPassword07');
            const admin = new User({
                name: 'Admin',
                surname: 'User',
                email: 'admin@example.com',
                password: hashedPassword,
                phone: '12345678',
                role: 'ADMIN_ROLE'
            });
            await admin.save();
            console.log('Admin creado');
        } else {
            console.log('Admin ya existe');
        }
    } catch (error) {
        console.error('Error al crear el admin:', error);
    }
};

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
        const { limits = 10, from = 0} = req.query
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

        if (data.user._id.toHexString() !== uid) {
            return res.status(401).json({
                success: false,
                message: "No tienes permisos para actualizar este usuario"
            });
        }

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

        if (data.user._id.toHexString() !== uid) {
            return res.status(401).json({
                success: false,
                message: "No tienes permisos para actualizar este usuario"
            });
        }

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

        if (data.user && data.user.role && data.user.role !== "CLIENTE_ROLE") {
            return res.status(400).json({
                success: false,
                message: "No puedes cambiar tu rol, solo un administrador puede hacerlo."
            });
        }

        if (data.user._id.toHexString() !== uid) {
            return res.status(401).json({
                success: false,
                message: "No tienes permisos para actualizar este usuario"
            });
        }

        delete data.password
        const user = await User.findByIdAndUpdate(uid, data, { new: true });

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

export const updateAnyone = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const updatedUser = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: "Usuario Actualizado",
            user: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar usuario",
            error: err.message
        });
    }
};

export const deleteAnyone = async (req, res) => {
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

initAdmin();