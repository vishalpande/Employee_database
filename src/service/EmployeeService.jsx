const BASE_URL = "http://localhost:3001";
import axios from 'axios'

class EmployeeService {
    constructor() {
        // Initialize with an empty array (you can fetch data from the API here)
        this.employeeDetails = [];
    }

    async getAllEmployees() {
        try {
            const response = await axios.get(`${BASE_URL}/employee`);
            this.employeeDetails = response.data; // Update the local array
            return this.employeeDetails;
        } catch (error) {
            console.error("Error fetching employees:", error);
            return []; // Return an empty array in case of an error
        }
    }

    async getById(employeeId) {
        try {
            const response = await axios.get(`${BASE_URL}/employee/${employeeId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching employee by ID:", error);
            return null; // Return null if employee not found or an error occurs
        }
    }

    async addEmployee(employeeData) {
        try {
            const response = await axios.post(`${BASE_URL}/employee`, employeeData);
            return response.data; // Return the added employee
        } catch (error) {
            console.error("Error adding employee:", error);
            return null; // Return null if adding fails
        }
    }

    async updateEmployee(employeeData) {
        try {
            const response = await axios.put(`${BASE_URL}/employee/${employeeData.id}`, employeeData);
            return response.data; // Return the updated employee
        } catch (error) {
            console.error("Error updating employee:", error);
            return null; // Return null if updating fails
        }
    }

    async deleteEmployee(employeeId) {
        try {
            const response = await axios.delete(`${BASE_URL}/employee/${employeeId}`);
            return response.data; // Return success message or relevant data
        } catch (error) {
            console.error("Error deleting employee:", error);
            return null; // Return null if deletion fails
        }
    }
}

export default new EmployeeService();