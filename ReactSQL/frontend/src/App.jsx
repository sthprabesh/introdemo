import React, { useState, useEffect } from "react";
import CreateUsers from "./components/CreateUsers";
import ReadUsers from "./components/ReadUsers";
import UpdateUsers from "./components/UpdateUsers";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    // Fetch users from the backend
    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:3000/get-users");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to add a user and update state
    const handleUserAdded = async () => {
        await fetchUsers(); // Refresh users list after adding
    };

    // Function to update user list when an update happens
    const handleUserUpdated = async () => {
        setEditingUser(null); // Close update form
        await fetchUsers();
    };

    // Function to delete a user and update state
    const handleUserDeleted = async (id) => {
        try {
            await fetch(`http://localhost:3000/delete-user/${id}`, { method: "DELETE" });
            setUsers(users.filter(user => user.id !== id)); // Remove user from state
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">User Management</h1>
            <CreateUsers onUserAdded={handleUserAdded} />
            {editingUser && (
                <UpdateUsers user={editingUser} onUpdateComplete={handleUserUpdated} />
            )}
            <ReadUsers users={users} onEdit={setEditingUser} onDelete={handleUserDeleted} />
        </div>
    );
};

export default App;
