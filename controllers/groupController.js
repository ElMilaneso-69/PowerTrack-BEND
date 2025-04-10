import {createGroup, getGroups} from '../models/groupModel.js';

export const createGroups = async (req, res) => {
    const { name, devices } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Nombre requerido" });
    }
    if (!Array.isArray(devices) || devices.length === 0) {
        return res.status(400).json({ message: "Debes proporcionar un arreglo de dispositivos" });
    }

    try {
        const newGroup = await createGroup(name, devices);
        res.status(201).json({ message: "Grupo creado exitosamente", newGroup });
    } catch (error) {
        if (error.message.includes("Ya existe un grupo con ese nombre")) {
            return res.status(400).json({ message: error.message });  // Responder con 400 en lugar de 500
        }
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


export const getAllGroups = async (req, res) => {
    try {
        const groups = await getGroups();
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los grupos', error: error.message });
    }
};