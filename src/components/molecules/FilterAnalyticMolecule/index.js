import React from 'react';
import DatePickerAtom from '../../atoms/DatePicker';
import SelectAtom from '../../atoms/Select';
import ButtonAtom from '../../atoms/Button';
import './styles.css';

function FilterAnalyticMolecule({
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
    <div className="filter-analytic-molecule">
      <div className="filter-group">
        <label>Tarih Aralığı:</label>
        <DatePickerAtom
          placeholder="Başlangıç"
          value={dateRange?.startDate}
          onChange={(date) => setDateRange({ ...dateRange, startDate: date })}
        />
        <DatePickerAtom
          placeholder="Bitiş"
          value={dateRange?.endDate}
          onChange={(date) => setDateRange({ ...dateRange, endDate: date })}
        />
      </div>
      <div className="filter-group">
        <label>Kullanıcı:</label>
        <SelectAtom
          placeholder="Kullanıcı seçin"
          value={selectedUser}
          onChange={(value) => setSelectedUser(value)}
        >
          <SelectAtom.Option value="">Tüm Kullanıcılar</SelectAtom.Option>
          {users.map((user) => (
            <SelectAtom.Option key={user.id} value={user.id}>
              {user.name}
            </SelectAtom.Option>
          ))}
        </SelectAtom>
      </div>
      <div className="filter-group">
        <label>Kategori:</label>
        <SelectAtom
          placeholder="Kategori seçin"
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value)}
        >
          <SelectAtom.Option value="">Tüm Kategoriler</SelectAtom.Option>
        </SelectAtom>
      </div>
      <ButtonAtom type="primary" onClick={filterAnalytics}>
        Filtrele
      </ButtonAtom>
    </div>
  );
}

export default FilterAnalyticMolecule;
