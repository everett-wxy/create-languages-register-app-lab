const BASE_URL = import.meta.env.VITE_SERVER + "/lab/users";

const fetchUsers = async () => {
    try {
        const res = await fetch(BASE_URL);

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Error fetching users:", err.message);
    }
};

const createUsers = async (newName, newAge, newCountry) => {
    console.log(`service function-createUsers triggered`);
    try {
        const res = await fetch(BASE_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newName,
                age: newAge,
                country: newCountry,
            }),
        });
        if (!res.ok) {
            throw new Error("fail to add user");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error updating users:", error.message);
        throw error;
    }
};

const deleteUsers = async (userId) => {
    console.log("attempting delete");
    try {
        const res = await fetch(`${BASE_URL}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json", // Added Content-Type header
            },
            body: JSON.stringify({ user_id: userId }),
        });
        if (!res.ok) {
            throw new Error(`Failed to delete user with ID: ${userId}`);
        }
        console.log(`User with ID ${userId} deleted successfully`);
        return true;
    } catch (error) {
        console.log("Error deleting users:", error.message);
        return false;
    }
};

const updateUser = async (userId, updatedFields) => {
    try {
        const res = await fetch(`${BASE_URL}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: userId,
                ...updatedFields,
            }),
        });
        if (!res.ok) {
            throw new Errror(`Failed to update user with ID: ${userId}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("error updating users:,", error.message);
        throw error;
    }
};

const getUserLanguage = async (userId) => {
    const response = await fetch(`${BASE_URL}/languages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
    });

    if (!response.ok) {
        throw new Error(`Error fetching languages: ${response.status}`);
    }
    return await response.json();
};

const addLanguageForUser = async (userId, language) => {
    const response = await fetch(`${BASE_URL}/languages`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, language }),
    });
    if (!response.ok) {
        throw new Error(`Error adding language: ${response.status}`);
    }
    return await response.json();
};

export {
    fetchUsers,
    createUsers,
    deleteUsers,
    updateUser,
    getUserLanguage,
    addLanguageForUser,
};
