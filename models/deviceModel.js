/*import { db } from '../db/connection.js';


export const getDeviceById = async (id) => {
  const [rows] = await db.query('SELECT * FROM dispositivos WHERE id = ?', [id]);
  return rows[0];
};

export const updateDevice = async (id, name, status) => {
  const [result] = await db.query(
    'UPDATE dispositivos SET nombre = ?, estado = ? WHERE id = ?',
    [name, status, id]
  );
  return result.affectedRows;
};

export const createDevice = async (name, status) => {
  const [result] = await db.query(
    'INSERT INTO dispositivos (nombre, estado) VALUES (?, ?)', 
    [name, status]
  );
  return result.insertId;  // Devuelve el ID del nuevo dispositivo
};*/

import { db } from '../db/connection.js';

export const getDeviceById = async (id) => {
  const [rows] = await db.query('SELECT * FROM dispositivos WHERE id = ?', [id]);
  return rows[0];
};

export const updateDevice = async (id, name) => {
  const [result] = await db.query(
    'UPDATE dispositivos SET nombre = ? WHERE id = ?',
    [name, id]
  );
  return result.affectedRows;
};

export const createDevice = async (name) => {
  const [result] = await db.query(
    'INSERT INTO dispositivos (nombre) VALUES (?)', 
    [name]
  );
  return result.insertId;
};

export const getAllDevices = async () => {
  const query = `
    SELECT dispositivos.id, dispositivos.nombre AS dispositivo_nombre, dispositivos.ubicacion, dispositivos.usuario_id, grupos.nombre AS grupo_nombre
    FROM dispositivos
    LEFT JOIN grupos ON dispositivos.id_grupo = grupos.id
  `;
  
  const [rows] = await db.query(query);
  return rows;
};
