import axios from "axios";
import { useState, useEffect } from "react";

const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchContacts = async () => {
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://crm-backend-4ad5.vercel.app/api/lead/contacts",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("API Response:", response.data); // ✅ Debugging
        setContacts(Array.isArray(response.data) ? response.data : []); // ✅ Ensuring an array
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [token]);

  const addContact = async (newContact) => {
    if (!token) {
      setError("No authentication token found");
      return;
    }

    try {
      const response = await axios.post(
        "https://crm-backend-4ad5.vercel.app/api/lead/contacts",
        newContact,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setContacts((prevContacts) =>
        Array.isArray(prevContacts) ? [...prevContacts, response.data] : [response.data]
      ); // ✅ Prevent undefined errors
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return { contacts, loading, error, addContact };
};

export default useContacts;
