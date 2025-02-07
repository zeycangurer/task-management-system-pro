import React from 'react'
import './styles.css'
import { useTranslation } from 'react-i18next';

export default function FilterComponent({
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

    return (
        <div className="filters-section">
            <div className="filter-group">
                <label htmlFor="start-date">{t('Start Date')}:</label>
                <input
                    type="date"
                    id="start-date"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                />
            </div>

            <div className="filter-group">
                <label htmlFor="end-date">{t('End Date')}:</label>
                <input
                    type="date"
                    id="end-date"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                />
            </div>

            <div className="filter-group">
                <label htmlFor="user-select">{t('Select User')}:</label>
                {usersState.loading || customersState.loading ? (
                    <p>{t('Loading...')}:</p>
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

            <div className="button-group">
                <button className="list-button" onClick={filterTasks}>
                    {type === 'tasks' ? t('List Tasks') : t('List Projects')}
                </button>
                <button className="create-button" onClick={handleCreateTask}>
                    {type === 'tasks' ? t('Create Task') : t('Create Project')}
                </button>
            </div>
        </div>
    )
}
