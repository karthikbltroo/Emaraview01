import React, { PureComponent } from "react";
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

const data = [
  // {
  //   name: 'Page A',
  //   uv: 4000,
  //   pv: 2400,
  //   amt: 2400,
  // },
  // {
  //   name: 'Page B',
  //   uv: -3000,
  //   pv: 1398,
  //   amt: 2210,
  // },
  // {
  //   name: 'Page C',
  //   uv: -2000,
  //   pv: -9800,
  //   amt: 2290,
  // },
  // {
  //   name: 'Page D',
  //   uv: 2780,
  //   pv: 3908,
  //   amt: 2000,
  // },
  // {
  //   name: 'Page E',
  //   uv: -1890,
  //   pv: 4800,
  //   amt: 2181,
  // },
  // {
  //   name: 'Page F',
  //   uv: 2390,
  //   pv: -3800,
  //   amt: 2500,
  // },
  // {
  //   name: 'Page G',
  //   uv: 3490,
  //   pv: 4300,
  //   amt: 2100,
  // },

  {
    period: "August-2023",
    exciseTaxImport: 9814796.0,
    exciseTaxPoduction: 0.0,
    exciseTaxReleaseNoCustoms: 0.0,
    exciseTaxReleaseCustoms: 1768932.3,
    exciseTaxStockpiling: 0.0,
    exciseTaxDeductible: 0.0,
    totalExciseTaxdue: 11583728.3,
    netExciseTaxPayable: 11583728.3,
  },
];

export default class Example extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/s/bar-chart-with-positive-negative-i3b8b";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
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
  }
}
