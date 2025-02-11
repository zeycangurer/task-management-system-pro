import React, { useRef } from 'react';
import './styles.css';
import { useTranslation } from 'react-i18next';
import { FaList, FaPlus } from 'react-icons/fa';

  
function FilterComponent({
  dateRange,
  setDateRange,
  usersState,
  selectedUser,
  setSelectedUser,
  filterTasks,
  handleCreateTask,
  customersState,
  type
}) {
  const { t } = useTranslation();

  const initialStartDate = useRef(dateRange.startDate);
  const initialEndDate = useRef(dateRange.endDate);

  const handleDateChange = (field, value) => {
    if (!value || value.trim() === '') {
        const initialValue = field === 'startDate' ? initialStartDate.current : initialEndDate.current;
        setDateRange({ ...dateRange, [field]: initialValue });
      } else {
        setDateRange({ ...dateRange, [field]: value });
      }
  };

  const handleDateBlur = (field, value) => {
    if (!value || value.trim() === '') {
      const initialValue = field === 'startDate' ? initialStartDate.current : initialEndDate.current;
      setDateRange({ ...dateRange, [field]: initialValue });
    }
  };

  return (
    <div className="filter-component-screen">
      <div className="filters-group">
        <div className="filter-group">
          <label htmlFor="start-date">{t('Start Date')}:</label>
          <input
            type="date"
            id="start-date"
            value={dateRange.startDate}
            onChange={(e) => handleDateChange('startDate', e.target.value)}
            // onBlur={(e) => handleDateBlur('startDate', e.target.value)}

          />
        </div>

        <div className="filter-group">
          <label htmlFor="end-date">{t('End Date')}:</label>
          <input
            type="date"
            id="end-date"
            value={dateRange.endDate}
            onChange={(e) => handleDateChange('endDate', e.target.value)}
            // onBlur={(e) => handleDateBlur('endDate', e.target.value)}         
             />
        </div>

        <div className="filter-group">
          <label htmlFor="user-select">{t('Select User')}:</label>
          {usersState.loading || customersState.loading ? (
            <p>{t('Loading...')}</p>
          ) : usersState.error || customersState.error ? (
            <p className="error">{usersState.error || customersState.error}</p>
          ) : (
            <select
              id="user-select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">{t('All Users')}</option>
              {usersState.users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
      <div className="buttons-group">
        <button className="list-button" onClick={filterTasks}>
          <FaList style={{ marginRight: '5px' }} />
          {t('List')}
        </button>
        <button className="create-button" onClick={handleCreateTask}>
          <FaPlus style={{ marginRight: '5px' }} />
          {t('Create')}
        </button>
      </div>
    </div>
  );
}

export default FilterComponent;
