import React from 'react';

// Define the type for a single stat item
interface StatItem {
  name: string;
  value: string;
  unit?: string;
}

// Define the props interface for the JobStats component
interface JobStatsProps {
  stats: StatItem[];
}

export const StatsCards: React.FC<JobStatsProps> = ({ stats }) => {
  return (
    <div className="bg-gray-900">
      <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-sm font-medium leading-6 text-gray-400">{stat.name}</p>
            <p className="mt-2 flex items-baseline gap-x-2">
              <span className="text-4xl font-semibold tracking-tight text-white">{stat.value}</span>
              {stat.unit ? <span className="text-sm text-gray-400">{stat.unit}</span> : null}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};