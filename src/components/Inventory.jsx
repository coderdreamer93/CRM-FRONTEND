import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import Navbar from "../components/Navbar";

const Inventory = ({ Toggle }) => {
  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    quantity: "",
    price: "",
    description: "",
  });
  const [productNames, setProductNames] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");

  useEffect(() => {
    fetchInventory();
    fetchProductNames();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/inventories/inventories"
      );
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const fetchProductNames = async () => {
    try {
      const response = await axios.get(
        "https://pharmacy-system-backend.vercel.app/api/v1/sales/sales"
      );
      const productNames = response.data.map((sale) => sale.productName);
      setProductNames([...new Set(productNames)]); // Remove duplicates
    } catch (error) {
      console.error("Error fetching product names:", error);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Clear form data
    setFormData({
      productName: "",
      category: "",
      quantity: "",
      price: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://pharmacy-real-backend.vercel.app/api/v1/inventories/inventories",
        formData
      );
      fetchInventory();
      setShowModal(false); // Close modal after successful submission
      setFormData({
        // Clear form data after successful submission
        productName: "",
        category: "",
        quantity: "",
        price: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding item to inventory:", error);
    }
  };
  const handleSearchChange = (e) => {
    setsearchQuery(e.target.value);
  };
  const filteredInventory = inventory.filter((item) =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <div className="main-content container-fluid px-4">
        <div className="row mt-4">
          <div className="col table-responsive rounded p-3 border bg-white">
            <div className="d-flex gap-2 pb-4">
              <input
                type="text"
                name=""
                className="seacrh-input flex-fill"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button
                variant="info border-rounded"
                className="addItem-button"
                onClick={handleOpenModal}
              >
                + Add Item
              </Button>
            </div>

            <h2 className="pb-4">Inventory</h2>
            <table className="table  table-striped table-hover">
              <thead className="">
                <tr>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item, index) => (
                  <tr key={index}>
                    <td>{item.productName}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>
                      <Button variant="light" className="btn-sm">
                        <BsPencilSquare />
                      </Button>
                      <Button variant="light" className="btn-sm">
                        <BsTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for adding new item */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  as="select"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                >
                  <option value="">Select Product Name</option>
                  {productNames.map((productName, index) => (
                    <option key={index} value={productName}>
                      {productName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="info" onClick={handleSubmit}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/* </div>
            </div> */}
    </>
  );
};

export default Inventory;
