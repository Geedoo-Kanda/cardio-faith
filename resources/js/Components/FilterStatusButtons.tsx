// FilterButtons.js

import React from 'react';

const filterOptions = [
  { key: 'A venir', label: 'A venir' },
  { key: 'effectue', label: 'Effectuer' },
  { key: 'annule', label: 'Anuller' },
  { key: 'repporte', label: 'Reporter' },
];

const getButtonClass = (filterKey: string, activeFilter: any) =>
  `cursor-pointer rounded-sm py-1 md:py-2 border-gray-300 px-2 md:px-3 text-[9px] md:text-xs ${
    activeFilter === filterKey
      ? 'bg-red-600 text-white'
      : 'bg-white'
  } border`;

const FilterStatusButtons = ({ filter, handleFilterStatusClick }:any) => (
  <div className="flex justify-end flex-wrap items-center whitespace-nowrap gap-1">
    {filterOptions.map(({ key, label }) => (
      <div
        key={key}
        onClick={() => handleFilterStatusClick(key)}
        className={getButtonClass(key, filter)}
      >
        {label}
      </div>
    ))}
  </div>
);

export default FilterStatusButtons;
