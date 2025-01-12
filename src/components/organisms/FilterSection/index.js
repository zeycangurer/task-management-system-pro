import React from 'react';
import FilterAnalyticMolecule from '../../molecules/FilterAnalyticMolecule';
import './styles.css';

function FilterSection({
  dateRange,
  setDateRange,
  selectedUser,
  setSelectedUser,
  selectedCategory,
  setSelectedCategory,
  users,
  filterAnalytics,
}) {
  return (
    <div className="filter-section">
      <FilterAnalyticMolecule
        dateRange={dateRange}
        setDateRange={setDateRange}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        users={users}
        filterAnalytics={filterAnalytics}
      />
    </div>
  );
}

export default FilterSection;
