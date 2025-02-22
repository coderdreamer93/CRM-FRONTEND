import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Tables/Table";
import Donut from "./Donut";
import AreaChart from "./AreaChart";
// import "bootstrap-icons/font/bootstrap-icons.css";
import '../styles/card.css';

const Card = ({ Toggle }) => {
  const [counts, setCounts] = useState({ sales: 0, purchases: 0, products: 0, inventories: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [inventoriesData, setInventoriesData] = useState([]);

  const fetchData = async () => {
    try {
      const salesResponse = await axios.get(
        "https://pharmacy-system-backend.vercel.app/api/v1/sales/sales"
      );
      setSalesData(salesResponse.data);

      const inventoriesResponse = await axios.get(
        "https://pharmacy-backend-system.vercel.app/api/v1/inventories/inventories"
      );
      setInventoriesData(inventoriesResponse.data);
      const purchasesResponse = await axios.get(
        "https://pharmacy-system-backend.vercel.app/api/v1/purchase/purchases"
      );
      setInventoriesData(inventoriesResponse.data);

      const salesCount = salesResponse.data.length;
      const purchasesCount = purchasesResponse.data.length;
      const inventoriesCount = inventoriesResponse.data.length;

      setCounts({
        sales: salesCount,
        inventories: inventoriesCount,
        purchases: purchasesCount,
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const inventoryListColumns = ['Inventory name', 'Expire Date', 'Quantity', 'Chart', 'Return'];
  const inventoryListData = [
    ['Doxycycline', '24 Dec 2021', 40, '📈', '🔄'],
    ['Abetis', '24 Dec 2021', 40, '📈', '🔄'],
    ['Diasulin 10ml', '24 Dec 2021', 40, '📈', '🔄'],
    ['Cerox CV', '24 Dec 2021', 40, '📈', '🔄'],
    ['Fluclox', '24 Dec 2021', 40, '📈', '🔄'],
  ];
  const recentOrdersColumns = ['Medicine name', 'Batch No', 'Quantity', 'Status', 'Price'];
  const recentOrdersData = [
    ['Paricel 15mg', '783627834', 40, 'Delivered', '$23.00'],
    ['Abetis 20mg', '88832433', 40, 'Pending', '$23.00'],
    ['Cerox CV', '767676344', 40, 'Cancelled', '$23.00'],
    ['Abetis 20mg', '45578866', 40, 'Delivered', '$23.00'],
    ['Cerox CV', '767676344', 40, 'Cancelled', '$23.00'],
  ];
  return (
    <>
      {/* <Sidebar /> */}
      <div className="px-2">
        <div className="container-fluid">
          <div className="row g-3 my-2">
            <div className="col-lg-3">
              <div className="pt-4 pb-4 ps-4 bg-white d-flex flex-column gap-4 shadow-sm rounded">
                <div className="d-flex justify-content-start align-items-start gap-3 flex-wrap f-wrap">
                  <i
                    className="bi bi-cash-coin  d-flex align-items-center justify-content-center"
                    style={{
                      color: "white",
                      background: "green",
                      borderRadius: "50%",
                      padding: "10px",
                      fontSize: "26px",
                      outline: "1px solid #00000040 ",
                      outlineOffset: "4px",
                      boxShadow: "0px 0px 0px 2px #8080805e",
                    }}
                  ></i>
                  <div >

                    <h3 className="fs-5" style={{ color: "black" }}>
                      Products
                    </h3>

                    <h3 className="fs-0" style={{ color: "black" }}>
                      {counts.purchases}
                    </h3>
                  </div>
                </div>
                <a href="#" className="text-decoration-none text-success fs-12">
                  Show Details &gt;&gt;
                </a>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="pt-4 pb-4 ps-4 bg-white d-flex flex-column gap-4 shadow-sm rounded">
                <div className="d-flex justify-content-start align-items-start gap-3 flex-wrap f-wrap">
                  <i
                    className="bi bi-currency-dollar  d-flex align-items-center justify-content-center"
                    style={{
                      color: "white",
                      background: "#8fc7cc",
                      borderRadius: "50%",
                      padding: "10px",
                      fontSize: "26px",
                      outline: "1px solid #00000040 ",
                      outlineOffset: "4px",
                      boxShadow: "0px 0px 0px 2px #8080805e",
                    }}
                  ></i>
                  <div>

                    <h3 className="fs-5" style={{ color: "black" }}>
                      Sales
                    </h3>

                    <h3 className="fs-0" style={{ color: "black" }}>
                      {counts.sales}
                    </h3>
                  </div>
                </div>
                <a href="#" className="text-decoration-none text-success fs-12">
                  Show Details &gt;&gt;
                </a>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="pt-4 pb-4 ps-4 bg-white d-flex flex-column gap-4 shadow-sm rounded">
                <div className="d-flex justify-content-start align-items-start gap-3 flex-wrap f-wrap">
                  <i
                    className="bi bi-currency-dollar  d-flex align-items-center justify-content-center"
                    style={{
                      color: "white",
                      background: "#eb7a34",
                      borderRadius: "50%",
                      padding: "10px",
                      fontSize: "26px",
                      outline: "1px solid #00000040 ",
                      outlineOffset: "4px",
                      boxShadow: "0px 0px 0px 2px #8080805e",
                    }}
                  ></i>
                  <div>

                    <h3 className="fs-5" style={{ color: "black" }}>
                      Inventories
                    </h3>

                    <h3 className="fs-0" style={{ color: "black" }}>
                      {counts.inventories}
                    </h3>
                  </div>
                </div>
                <a href="#" className="text-decoration-none text-success fs-12">
                  Show Details &gt;&gt;
                </a>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="pt-4 pb-4 ps-4 bg-white d-flex flex-column gap-4 shadow-sm rounded">
                <div className="d-flex justify-content-start align-items-start gap-3 flex-wrap f-wrap">
                  <i
                    className="bi bi-truck  d-flex align-items-center justify-content-center"
                    style={{
                      color: "white",
                      background: "#8dbceb",
                      borderRadius: "50%",
                      padding: "10px",
                      fontSize: "26px",
                      outline: "1px solid #00000040 ",
                      outlineOffset: "4px",
                      boxShadow: "0px 0px 0px 2px #8080805e",
                    }}
                  ></i>
                  <div>

                    <h3 className="fs-5" style={{ color: "black" }}>
                      Purchase
                    </h3>

                    <h3 className="fs-0" style={{ color: "black" }}>
                      {counts.purchases}
                    </h3>
                  </div>
                </div>
                <a href="#" className="text-decoration-none text-success fs-12">
                  Show Details &gt;&gt;
                </a>
              </div>
            </div>

            <div className="col-lg-6"  >
              <div className="shadow-sm rounded  overflow-auto" style={{

                background: "#fff",

                padding: "10px",
                fontSize: "26px",

                boxShadow: "0px 0px 0px 2px #8080805e",
              }}>  <Table
                  title="Inventory List"
                  columns={inventoryListColumns}
                  data={inventoryListData}
                /></div>

            </div>
            <div className="col-lg-6" >
              <div className="shadow-sm rounded overflow-auto" style={{
                height: '100%',
                background: "#fff",
                padding: "10px",
                fontSize: "26px",

                boxShadow: "0px 0px 0px 2px #8080805e",
              }}> <Table
                  title="Recent Orders"
                  columns={recentOrdersColumns}
                  data={recentOrdersData}
                /></div>
            </div>
            <div className="col-lg-6">
              <div className="shadow-sm rounded " style={{

                background: "#fff",

                padding: "10px",
                fontSize: "26px",

                boxShadow: "0px 0px 0px 2px #8080805e",
              }}>
                <AreaChart /></div>
            </div>
            <div className="col-lg-6">
              <div className="shadow-sm rounded " style={{

                background: "#fff",

                padding: "10px",
                fontSize: "26px",

                boxShadow: "0px 0px 0px 2px #8080805e",
              }}>
                <Donut /></div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
