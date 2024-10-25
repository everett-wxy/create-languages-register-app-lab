import React, { useEffect, useState } from "react";
import * as userServices from "../services/userServices";

const Users = () => {
  const [users, setUsers] = useState([]);
  // const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newCountry, setNewCountry] = useState("");

  const [userIdToUpdate, setUserIdToUpdate] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedAge, setUpdatedAge] = useState("");
  const [updatedCountry, setUpdatedCountry] = useState("");

  const handleUpdateNameInput = (e) => {
    setUpdatedName(e.target.value);
  };

  const handleUpdateAgeInput = (e) => {
    setUpdatedAge(e.target.value);
  };

  const handleUpdateCountryInput = (e) => {
    setUpdatedCountry(e.target.value);
  };

  const updateUser = async () => {
    try {
      const updatedFields = {};
      if (updatedName) updatedFields.name = updatedName;
      if (updatedAge) updatedFields.age = updatedAge;
      if (updatedCountry) updatedFields.country = updatedCountry;

      const response = await userServices.updateUser(
        userIdToUpdate,
        updatedFields
      );
      console.log("User updated:", response);
      fetchUsers(); // Refresh user list after update
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  const fetchUsers = async () => {
    const data = await userServices.fetchUsers();
    setUsers(data);
    console.log(data);
  };

  const sendNewUser = async (newName, newAge, newCountry) => {
    console.log("sending new user:", { newName, newAge, newCountry });
    try {
      const data = await userServices.createUsers(newName, newAge, newCountry);
      console.log("User created:", data);
    } catch (error) {
      console.error("error creating user:", error.message);
    }
    fetchUsers();
  };

  const deleteUser = async (id) => {
    try {
      const data = await userServices.deleteUsers(id);
    } catch (error) {
      console.error("error deleting user:", error.message);
    }
    fetchUsers();
  };

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };

  const handleAgeInput = (e) => {
    setNewAge(e.target.value);
  };

  const handleCountryInput = (e) => {
    setNewCountry(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendNewUser(newName, newAge, newCountry);
  };

  const userList = users.map((user) => {
    return (
      <li key={user.id}>
        <ul>
          <li>user: {user.id}</li>
          <li>name: {user.name}</li>
          <li>age: {user.age}</li>
          <li>country: {user.country}</li>
          <li>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        </ul>
      </li>
    );
  });

  return (
    <div>
      <h1>User List</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user">Name of User: </label>
        <input
          id="user"
          name="user"
          type="text"
          value={newName}
          onChange={handleNameInput}
        ></input>
        <br />
        <label htmlFor="age">Age: </label>
        <input
          id="age"
          name="age"
          value={newAge}
          type="number"
          onChange={handleAgeInput}
        ></input>
        <br />
        <label htmlFor="country">Country: </label>
        <input
          id="country"
          name="country"
          value={newCountry}
          type="text"
          onChange={handleCountryInput}
        ></input>
        <br />
        <button type="submit">Submit</button>
      </form>
      <h1>Retrieve Users</h1>
      <button onClick={fetchUsers}>Retrieve Users</button>
      <ul>{userList}</ul>
      <h1>Update user</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateUser();
          setUpdatedAge('');
          setUpdatedCountry('');
          setUpdatedName('');
          setUserIdToUpdate('');
        }}
      >
        <label htmlFor="updateUserId">User ID: </label>
        <input
          id="updateUserId"
          type="text"
          value={userIdToUpdate}
          onChange={(e) => setUserIdToUpdate(e.target.value)}
        />
        <br />
        <label htmlFor="updateName">New Name (optional): </label>
        <input
          id="updateName"
          type="text"
          value={updatedName}
          onChange={handleUpdateNameInput}
        />
        <br />
        <label htmlFor="updateAge">New Age (optional): </label>
        <input
          id="updateAge"
          type="number"
          value={updatedAge}
          onChange={handleUpdateAgeInput}
        />
        <br />
        <label htmlFor="updateCountry">New Country (optional): </label>
        <input
          id="updateCountry"
          type="text"
          value={updatedCountry}
          onChange={handleUpdateCountryInput}
        />
        <br />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default Users;
