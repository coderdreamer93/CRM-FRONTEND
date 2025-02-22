import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [formData, setFormData] = useState({ name: "", price: "", description: "" });
  const [products, setProducts] = useState([]); // 👈 State to store user products
  const { logout } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(); // 👈 Fetch products on component mount
  }, []);

  // ✅ Fetch User Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/products/my-products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data); // 👈 Store products in state
    } catch (error) {
      toast.error("Error fetching products");
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/products/add", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product Added!");
      fetchProducts(); // 👈 Refresh products after adding
    } catch (error) {
      toast.error("Error Adding Product");
    }
  };

  // ✅ Logout Function
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
        <button type="submit">Add Product</button>
      </form>

      {/* ✅ Logout Button */}
      <button onClick={handleLogout} style={{ marginTop: "20px", background: "red", color: "white" }}>
        Logout
      </button>

      {/* ✅ User's Products Table */}
      <h2>My Products</h2>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <table border="1" style={{ width: "100%", marginTop: "20px", textAlign: "center" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AddProduct;
