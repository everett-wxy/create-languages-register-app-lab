const BASE_URL = import.meta.env.VITE_SERVER + "/lab/languages";

const fetchLanguages = async () => {
  try {
    const res = await fetch(BASE_URL);

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching languages:", err.message);
  }
};

const createLanguage = async (newLanguage) => {
  const res = await fetch(BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language: newLanguage,
    }),
  });
  if (!res.ok) {
    throw new Error("fail to add language");
  }
  const data = await res.json();
  return data;
};

const deleteBook = async (language) => {
  try {
    const res = await fetch(BASE_URL + "/" + language, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const errorMsg = await res.text(); // get error message
      throw new Error(`Cannot delete book: ${errorMsg || res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error deleting language:", error.message);
    throw error;
  }
};

export { fetchLanguages, createLanguage, deleteBook };
