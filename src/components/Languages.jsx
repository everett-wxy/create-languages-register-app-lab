import React, { useEffect, useState } from "react";
import * as languageServices from "../services/languageServices";

const Languages = () => {
  const [languages, setLanguages] = useState([]);
  const [newLanguage, setNewLanguage] = useState("");

  const fetchData = async () => {
    const data = await languageServices.fetchLanguages();
    console.log("Data:", data);
    const newLanguagesState = data;
    setLanguages(newLanguagesState);
  };

  const createLanguage = async () => {
    try {
      const data = await languageServices.createLanguage(newLanguage);
      setNewLanguage("");
    } catch (error) {
      console.error("error creating language:", error.message);
    }
    fetchData();
  };

  const handleDeleteLanguage = async (language) => {
    try {
      await languageServices.deleteBook(language);
    } catch (error) {
      console.error("Error deleting language:", error.message);
    }
    fetchData();
  };

  function handleLanguageInput(e) {
    setNewLanguage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    createLanguage();
  }

  const languageList = languages.map((language, i) => {
    return (
      <li key={i}>
        <ul>
          <li>Language: {language.language}</li>
          <li>Created at: {language.created_at}</li>
          <li>
            <button onClick={() => handleDeleteLanguage(language.language)}>
              Delete
            </button>
          </li>
        </ul>
      </li>
    );
  });

  return (
    <div>
      <h1>Language Data</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newLanguage">New language:</label>
        <input
          id="newLanguage"
          name="newLanguage"
          onChange={handleLanguageInput}
          value={newLanguage}
        ></input>
        <button type="submit">Submit</button>
      </form>
      <button onClick={fetchData}>Fetch</button>
      <section>
        <ul>{languageList}</ul>
      </section>
    </div>
  );
};

export default Languages;
