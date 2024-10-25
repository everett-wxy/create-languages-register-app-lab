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

export { fetchUsers, createUsers, deleteUsers };
