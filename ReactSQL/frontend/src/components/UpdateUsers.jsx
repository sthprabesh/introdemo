import React, { useState } from "react";

const UpdateUsers = ({ user, onUpdateComplete }) => {
    const [name, setName] = useState(user.name);
    const [age, setAge] = useState(user.age);
    const [sex, setSex] = useState(user.sex);

    const handleUpdate = async () => {
        const updatedUser = { name, age, sex };

        try {
            const response = await fetch(`http://localhost:3000/update-user/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                onUpdateComplete();
            } else {
                console.error("Failed to update user.");
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="card shadow p-4 mt-4">
            <h2 className="text-center mb-3">Update User</h2>
            <form>
                <div className="mb-3">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                    <select value={sex} onChange={(e) => setSex(e.target.value)} className="form-select">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button type="button" className="btn btn-success w-100" onClick={handleUpdate}>
                    Update User
                </button>
            </form>
        </div>
    );
};

export default UpdateUsers;
