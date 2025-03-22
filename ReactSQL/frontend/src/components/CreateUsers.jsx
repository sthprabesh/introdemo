import React, { useState } from "react";

const CreateUsers = ({ onUserAdded }) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [sex, setSex] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !age || !sex) {
            alert("Please fill in all fields.");
            return;
        }

        const newUser = { name, age, sex };

        try {
            const response = await fetch("http://localhost:3000/add-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                onUserAdded(); // Update user list dynamically
                setName("");
                setAge("");
                setSex("");
            } else {
                console.error("Failed to add user.");
            }
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    return (
        <div className="card shadow p-4">
            <h2 className="text-center mb-3">Add User</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <select
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                        className="form-select"
                    >
                        <option value="">Select Sex</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Add User
                </button>
            </form>
        </div>
    );
};

export default CreateUsers;
