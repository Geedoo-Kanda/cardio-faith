// FilterButtons.js

import React from 'react';

const filterOptions = [
  { key: 'all', label: 'Tout' },
  { key: 'today', label: 'Aujourd\'hui' },
  { key: 'yesterday', label: 'Hier' },
  { key: 'week', label: 'Cette semaine' },
  { key: 'month', label: 'Ce mois' },
  { key: 'year', label: 'Cette année' },
];

const getButtonClass = (filterKey: string, activeFilter: any) =>
  `cursor-pointer rounded-sm py-1 md:py-2 border-gray-300 px-2 md:px-3 text-[9px] md:text-xs ${
    activeFilter === filterKey
      ? 'bg-red-600 text-white'
      : 'bg-white'
  } border`;

const FilterButtons = ({ filter, handleFilterClick }:any) => (
  <div className="flex justify-end flex-wrap items-center whitespace-nowrap gap-1">
    {filterOptions.map(({ key, label }) => (
      <div
        key={key}
        onClick={() => handleFilterClick(key)}
        className={getButtonClass(key, filter)}
      >
        {label}
      </div>
    ))}
  </div>
);

export default FilterButtons;
