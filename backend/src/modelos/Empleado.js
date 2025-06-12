import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchEmpleados = async () => {
  try {
    const response = await API.get('/empleados');
    return response.data;
  } catch (error) {
    console.error('Error fetching empleados:', error);
    throw error;
  }
};

export const addEmpleado = async (empleadoData) => {
  try {
    const response = await API.post('/empleados', empleadoData);
    return response.data;
  } catch (error) {
    console.error('Error adding empleado:', error);
    throw error;
  }
};