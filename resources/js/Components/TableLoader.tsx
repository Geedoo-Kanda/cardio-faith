import React from 'react';

const TableLoader = ({ rows, columns }:any) => {
  const renderHeader = () => {
    return (
      <thead className="bg-gray-700">
        <tr>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <th key={colIndex} scope="col" className="py-5 px-3 text-center"></th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderRows = () => {
    return Array.from({ length: rows }).map((_, rowIndex) => (
      <tr key={rowIndex}>
        {Array.from({ length: columns }).map((_, colIndex) => (
          <td key={colIndex} className="p-3 font-medium whitespace-nowrap text-center">
            <div className='h-5 w-full bg-gray-100 italic'></div>
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="overflow-auto rounded-lg border mx-4">
      <table className="min-w-full animate-pulse">
        {renderHeader()}
        <tbody className="bg-white divide-y divide-gray-200 text-sm">
          {renderRows()}
        </tbody>
      </table>
    </div>
  );
};

export default TableLoader;
