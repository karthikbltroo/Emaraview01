
import React, { useState, useEffect, PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import api from "../../utils/api";

const BGutilizationChart = () => {
  let displayName = sessionStorage.getItem("displayName");
  const [data, setData] = useState([]);
  console.log("name is", displayName);

// based on client Name




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/getBGUtilization?client_Name=${displayName}`
        );
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [displayName]);

  return (
    <ResponsiveContainer width="100%" height="70%">
      <BarChart
        width={100}
        height={200}
        data={data}
        margin={{
          top: 6,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dzNumber" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="bgUtilization" fill="#BAE486" />
        <Bar dataKey="bgValue" fill="#8BECEF" />

      </BarChart>
    </ResponsiveContainer>
  );
};

export default BGutilizationChart;
