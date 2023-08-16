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

const TaxLiabilityChart = () => {
  let displayName = sessionStorage.getItem("displayName");
  const [data, setData] = useState([]);
  console.log("name is", displayName);

// based on client Name

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/getTaxLiability?client_Name=${displayName}&duration=current`
        );
        setData(response.data.data);
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
        height={300}
        data={data}
        margin={{
          top: 6,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="exciseTaxImport" fill="#8884d8" />
        <Bar dataKey="exciseTaxPoduction" fill="#82ca9d" />
        <Bar dataKey="exciseTaxReleaseNoCustoms" fill="#afd16f" />
        <Bar dataKey="exciseTaxReleaseCustoms" fill="#645161" />
        <Bar dataKey="exciseTaxStockpiling" fill="#4905af" />
        <Bar dataKey="exciseTaxDeductible" fill="#7b2b74" />
        <Bar dataKey="totalExciseTaxdue" fill="#f7a20d" />
        <Bar dataKey="netExciseTaxPayable" fill="#591777" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TaxLiabilityChart;
