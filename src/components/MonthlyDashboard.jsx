import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, TrendingDown, FileText, Percent, CreditCard, Menu } from 'lucide-react';

const COLORS = ['#4CAF50', '#FFC107', '#2196F3', '#9C27B0'];

const MonthlyDashboard = (props) => {
    const data = props.data
    // console.log(data)
    const monthlyData = {
        income: { value: 7100, budget: 7800, diff: -700 },
        expenses: { value: 1225, budget: 2970, diff: -1745 },
        bills: { value: 1482, budget: 1720, diff: -238 },
        savings: { value: 1800, budget: 1600, diff: 200 },
        debt: { value: 600, budget: 600, diff: 0 }
    };

    const cashflowData = [
        { name: 'Income', budget: 7800, activity: 7100, shareOfBudget: '-', shareOfActivity: '-' },
        { name: 'Expenses', budget: 2970, activity: 1225.21, shareOfBudget: '38%', shareOfActivity: '17%' },
        { name: 'Bills', budget: 1720, activity: 1482, shareOfBudget: '22%', shareOfActivity: '21%' },
        { name: 'Savings', budget: 1600, activity: 1800, shareOfBudget: '21%', shareOfActivity: '25%' },
        { name: 'Debt', budget: 600, activity: 600, shareOfBudget: '8%', shareOfActivity: '8%' },
        { name: 'Remaining income', budget: 910, activity: 1992.79, shareOfBudget: '12%', shareOfActivity: '28%' }
    ];

    const incomeData = [
        { name: 'Salary', budget: 3400, activity: 3400, difference: 0, percentOfBudget: 100 },
        { name: 'Partner salary', budget: 2400, activity: 2400, difference: 0, percentOfBudget: 100 },
        { name: 'Freelancing', budget: 800, activity: 100, difference: -700, percentOfBudget: 13 },
        { name: 'Rental income', budget: 1200, activity: 1200, difference: 0, percentOfBudget: 100 }
    ];

    const shareOfActivityData = [
        { name: 'Salary', value: 47.9 },
        { name: 'Partner salary', value: 33.8 },
        { name: 'Rental income', value: 16.9 },
        { name: 'Freelancing', value: 1.4 }
    ];

    return (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  
         lg:grid-cols-5 gap-2 sm:gap-4 mb-4 sm:mb-6" >
            <MonthlyCard title="Income" value={data.total_income.replace(/\.00([^\d])/g,'$1')} color="text-green-500" icon={<DollarSign />} percentage={91} />
            <MonthlyCard title="Expenses" value={data.total_expense.replace(/\.00([^\d])/g,'$1')} color="text-red-500" icon={<TrendingDown />} percentage={41} />
            <MonthlyCard title="Savings" value={data.total_saving} color="text-yellow-500" icon={<FileText />} percentage={86} />
            <MonthlyCard title="Debt" value={data.debt} color="text-blue-500" icon={<Percent />} percentage={113} />
            <MonthlyCard title="Net" value={data.net} color="text-purple-500" icon={<CreditCard />} percentage={100} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 bg-gray-800 p-4 rounded-lg shadow-xl overflow-x-auto">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Cashflow</h2>
            <table className="w-full min-w-max">
                <thead>
                <tr className="text-xs sm:text-sm">
                    <th className="text-left p-2">Category</th>
                    <th className="text-right p-2">Budget</th>
                    <th className="text-right p-2">Activity</th>
                    <th className="text-right p-2">Share (budget)</th>
                    <th className="text-right p-2">Share (activity)</th>
                </tr>
                </thead>
                <tbody>
                {cashflowData.map((item, index) => (
                    <tr key={index} className={`text-xs sm:text-sm ${index % 2 === 0 ? 'bg-gray-700' : ''}`}>
                    <td className="p-2">{item.name}</td>
                    <td className="text-right p-2">${item.budget.toLocaleString()}</td>
                    <td className="text-right p-2">${item.activity.toLocaleString()}</td>
                    <td className="text-right p-2">{item.shareOfBudget}</td>
                    <td className="text-right p-2">{item.shareOfActivity}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg lg:col-span-2">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Allocations Breakdown</h2>
            <div className="flex flex-col sm:flex-row justify-around items-center ">
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                    <PieChartComponent data={cashflowData.slice(1, 5)} dataKey="budget" title="Budget" label=""/>
                </div>
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                    <PieChartComponent data={cashflowData.slice(1, 5)} dataKey="activity" title="Activity" />
                </div>

            </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 sm:mt-6">
            <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold mb-4">INCOME</h2>
            <table className="w-full min-w-max">
                <thead>
                <tr className="text-xs sm:text-sm">
                    <th className="text-left p-2">Envelopes</th>
                    <th className="text-right p-2">Budget</th>
                    <th className="text-right p-2">Activity</th>
                    <th className="text-right p-2">Difference</th>
                    <th className="text-right p-2">% of budget</th>
                </tr>
                </thead>
                <tbody>
                {incomeData.map((item, index) => (
                    <tr key={index} className={`text-xs sm:text-sm ${index % 2 === 0 ? 'bg-gray-700' : ''}`}>
                    <td className="p-2">{item.name}</td>
                    <td className="text-right p-2">${item.budget.toLocaleString()}</td>
                    <td className="text-right p-2">${item.activity.toLocaleString()}</td>
                    <td className="text-right p-2">${item.difference.toLocaleString()}</td>
                    <td className="text-right p-2">{item.percentOfBudget}%</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
                <h2 className="text-lg sm:text-xl font-bold mb-4">Activity vs budget</h2>
                <ResponsiveContainer width="100%" height={150}>
                <BarChart className='text-sm lg:text-lg' data={[{ name: 'Income', activity: 7100, budget: 7800 }]}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="activity" fill="#4CAF50" />
                    <Bar dataKey="budget" fill="#2196F3" />
                </BarChart>
                </ResponsiveContainer>
                <p className="text-center mt-2 text-sm lg:text-lg">$700 below budget</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
                <h2 className="text-lg sm:text-xl font-bold mb-4">Share of Activity</h2>
                <div className="w-full mb-4 sm:mb-0">
                <PieChartComponent data={shareOfActivityData} dataKey="value" title="Activity" />
                </div>
            </div>
            </div>
        </div>
        </>
    );
};

const MonthlyCard = ({ title, value, color, icon, percentage }) => (
  <div className="bg-gray-800 p-3 sm:p-4 rounded-lg shadow-xl">
    <div className="flex justify-between items-center mb-2">
      <h3 className={`text-xs sm:text-sm font-medium ${color}`}>{title}</h3>
      <div className={`${color} text-xl sm:text-2xl`}>{icon}</div>
    </div>
    <p className={`text-lg sm:text-2xl font-bold ${color}`}>{value.toLocaleString()} VND</p>
    {/* <p className="text-xs sm:text-sm">${Math.abs(diff)} {diff >= 0 ? 'above' : 'below'} budget</p> */}
    <p className="text-xs sm:text-sm">Is equal to last month</p>
    <div className="mt-2 bg-gray-700 rounded-full h-1 sm:h-2 overflow-hidden">
      <div className={`${color} h-full`} style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

const PieChartComponent = ({ data, dataKey, title }) => (
  <div>
    <h3 className="text-center text-sm font-medium mb-2">{title}</h3>
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie 
          className='text-sm lg:text-lg'
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={30}
          outerRadius={60}
          fill="#8884d8"
          dataKey={dataKey}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default MonthlyDashboard;