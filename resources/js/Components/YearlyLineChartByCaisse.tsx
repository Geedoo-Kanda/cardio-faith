'use client'

import React, { useContext, useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const colorMap:any = {
  red: '#ed0000',
  cyan: '#17a2b8'
};



const getColorClass = (colorName: string) => ({
  backgroundColor: colorMap[colorName],
});

const DataItem = ({ label, value, color }:any) => (
  <div className="grid grid-cols-12 gap-2 items-center text-gray-800 w-full mb-1">
    <div className="col-span-6 flex items-center space-x-1">
      <span className="h-3 w-3 rounded-full" style={getColorClass(color)}></span>
      <span>{label} </span>
    </div>
    <span>:</span>
    <div className="font-bold col-span-5">{value}</div>
  </div>
);


const CustomTooltip = ({ active, payload, label }:any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white borde rounded-lg overflow-hidden shadow-lg text-sm pb-4 max-w-xs">
        <p className="font-bold border-b mb-2 p-2 bg-red-600 text-white">{`Mois : ${label}`}</p>
        <div className="px-2">
          <DataItem label="Total retrait" value={payload[0]?.value} color="red" />
          <DataItem label="Total depot" value={payload[1]?.value} color="cyan" />
        </div>
      </div>
    );
  }

  return null;
};
const YearlyLineChartByCaisse = ({ monthlyData = [] }) => {
  const [selected, setSelected] = useState(monthlyData);

  useEffect(() => {
    setSelected(monthlyData)
  }, [monthlyData]);


  if (monthlyData.length === 0) {
    return <div className='py-12 text-center'>Aucune donnée disponible.</div>;
  }

  console.log(monthlyData)

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={selected}>
        <CartesianGrid strokeDasharray="1 3" stroke="#9ca3af" />
        <XAxis dataKey="name" stroke="#9ca3af" className='text-sm' />
        <YAxis stroke="#9ca3af" className='text-sm' />
        <Tooltip content={CustomTooltip} />
        <Legend />
        <Line type="monotone" dataKey="retrait" name="Total retrait" stroke="#ed0000" />
        <Line type="monotone" dataKey="depot" name="Total depot" stroke="#17a2b8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default YearlyLineChartByCaisse;
