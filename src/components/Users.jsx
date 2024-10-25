import React, { useEffect, useState } from "react";
import * as userServices from "../services/userServices";

const Users = () => {
  const [users, setUsers] = useState([]);
  // const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newCountry, setNewCountry] = useState("");

  const fetchUsers = async () => {
    const data = await userServices.fetchUsers();
    setUsers(data);
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
      console.error('error deleting user:',  error.message);
    }
    fetchUsers();
  }

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
      <li>
        <ul>
          <li>{user.id}</li>
          <li>{user.name}</li>
          <li>{user.age}</li>
          <li>{user.country}</li>
          <li><button onClick={()=>deleteUser(user.id)}>Delete</button></li>
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
    </div>
  );
};

export default Users;
