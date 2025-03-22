import React from "react";
import DeleteUsers from "./DeleteUsers";

const ReadUsers = ({ users, onEdit, onDelete }) => {
    return (
        <div className="card shadow p-4 mt-4">
            <h2 className="text-center mb-3">User List</h2>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Sex</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.sex}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(user)}>
                                        Edit
                                    </button>
                                    <DeleteUsers userId={user.id} onDelete={onDelete} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ReadUsers;
