import React from 'react'
import './styles.css'

export default function FilterComponent({
    dateRange,
    setDateRange,
    usersState,
    selectedUser,
    setSelectedUser,
    filterTasks,
    handleCreateTask,
    customersState
}) {
    return (
        <div className="filters-section">
            <div className="filter-group">
                <label htmlFor="start-date">Başlangıç Tarihi:</label>
                <input
                    type="date"
                    id="start-date"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                />
            </div>

            <div className="filter-group">
                <label htmlFor="end-date">Bitiş Tarihi:</label>
                <input
                    type="date"
                    id="end-date"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                />
            </div>

            <div className="filter-group">
                <label htmlFor="user-select">Kullanıcı Seç:</label>
                {usersState.loading || customersState.loading ? (
                    <p>Yükleniyor...</p>
                ) : usersState.error || customersState.error ? (
                    <p className="error">{usersState.error || customersState.error}</p>
                ) : (
                    <select
                        id="user-select"
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                    >
                        <option value="">Tüm Kullanıcılar</option>
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
                    Talep Listele
                </button>
                <button className="create-button" onClick={handleCreateTask}>
                    Talep Oluştur
                </button>
            </div>
        </div>
    )
}
