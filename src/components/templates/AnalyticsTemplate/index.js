import React from 'react';
import DashboardHeader from '../../organisms/DashboardHeader';
import StatsCards from '../../organisms/StatsCards';
import ChartsSection from '../../organisms/ChartsSection';
import DetailsTable from '../../organisms/DetailsTable';
import './styles.css';
import { useTranslation } from 'react-i18next';

function AnalyticsTemplate({
    users,
    tasks,
    projects,
    customers,
    viewType
}) {
    const { t } = useTranslation();

    return (
        <div className="analytics-template">
            <DashboardHeader
                title={t('Projects Analysis')}
                subtitle={t('Projects and tasks detailed analysis')}
            />
            <StatsCards projects={projects} tasks={tasks} users={users} customers={customers} />
            {/* <FilterSection
        dateRange={dateRange}
        setDateRange={setDateRange}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        users={users}
        filterAnalytics={filterAnalytics}
      /> */}

            <ChartsSection tasks={tasks} users={users} projects={projects} viewType={viewType} />
            <DetailsTable tasks={tasks} users={users} />
        </div>
    );
}

export default AnalyticsTemplate;
