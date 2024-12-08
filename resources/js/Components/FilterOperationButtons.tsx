// FilterButtons.js

import React from 'react';

const filterOptions = [
  { key: 'depot', label: 'Depot' },
  { key: 'retrait', label: 'Retrait' },
];

const getButtonClass = (filterKey: string, activeFilter: any) =>
  `cursor-pointer rounded-sm py-1 md:py-2 border-gray-300 px-2 md:px-3 text-[9px] md:text-xs ${
    activeFilter === filterKey
      ? 'bg-red-600 text-white'
      : 'bg-white'
  } border`;

const FilterOperationButtons = ({ filter, handleFilterOperationClick }:any) => (
  <div className="flex justify-end flex-wrap items-center whitespace-nowrap gap-1">
    {filterOptions.map(({ key, label }) => (
      <div
        key={key}
        onClick={() => handleFilterOperationClick(key)}
        className={getButtonClass(key, filter)}
      >
        {label}
      </div>
    ))}
  </div>
);

export default FilterOperationButtons;
