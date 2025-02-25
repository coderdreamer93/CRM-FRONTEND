import React, { useState, useEffect } from "react";
import axios from "axios";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://node-js-boiler-plate.vercel.app/api/products/my-products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>My Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyProducts;
