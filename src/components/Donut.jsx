import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const Donut = () => {
    const [salesData, setSalesData] = useState([]);
    const [inventoriesData, setInventoriesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Comment out the actual API calls for now
                // const salesResponse = await axios.get('http://localhost:8080/api/v1/sales/sales');
                // const inventoriesResponse = await axios.get('http://localhost:8080/api/v1/inventories/inventories');

                // Use dummy data for now
                const salesResponse = { data: [10, 20, 30, 40, 50] };
                const inventoriesResponse = { data: [15, 25, 35, 45, 55] };

                setSalesData(salesResponse.data);
                setInventoriesData(inventoriesResponse.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const totalSales = salesData.reduce((acc, curr) => acc + curr, 0);
    const totalInventories = inventoriesData.reduce((acc, curr) => acc + curr, 0);

    const options = {
        chart: {
            type: 'pie',
        },
        labels: ['Total Sales', 'Total Inventories'],
        series: [totalSales, totalInventories],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 300
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ width: '100%',  padding: '10px' }}>
            <Chart options={options} series={options.series} type="pie" width="109%" />
        </div>
    );
};

export default Donut;
