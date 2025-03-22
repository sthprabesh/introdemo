import React from "react";

const DeleteUsers = ({ userId, onDelete }) => {
    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:3000/delete-user/${userId}`, { method: "DELETE" });
            onDelete(userId); // Instantly remove user from UI
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>
            Delete
        </button>
    );
};

export default DeleteUsers;
