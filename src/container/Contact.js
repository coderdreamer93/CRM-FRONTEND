import axios from "axios";
import { useState, useEffect } from "react";

const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "https://crm-backend-4ad5.vercel.app/api/lead/contacts"
        );
        setContacts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const addContact = async (newContact) => {
    try {
      const response = await axios.post(
        "https://crm-backend-4ad5.vercel.app/api/lead/contacts",
        newContact
      );
      setContacts((prevContacts) => [...prevContacts, response.data]);
    } catch (err) {
      setError(err.message);
    }
  };

  return { contacts, loading, error, addContact };
};

export default useContacts;
