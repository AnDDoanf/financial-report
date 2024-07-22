import React, { useState, useEffect } from 'react';
import './App.css';
import MonthlyDashboard from './components/MonthlyDashboard';
import Navbar from './components/Navbar';
import data from './data.json'
import HistoryDashboard from './components/HistoryDashboard';
// import { Menu } from 'lucide-react';

function App() {
  const d = new Date();
  let cur_month = (d.getMonth() + 1).toString();
  let cur_year = d.getFullYear().toString();



  const [curObject, setCurObject] = useState(null)

  useEffect(() => {
    const filteredObject = data.filter(item => item.year === cur_year && item.month === cur_month);
    setCurObject(filteredObject[0])
  })

  const [selectedComponent, setSelectedComponent] = useState('home');

  const renderComponent = () => {
      switch (selectedComponent) {
          case 'home':
              return <HistoryDashboard data = {data}/>;
          case 'about':
              return <MonthlyDashboard data = {curObject}/>;
          case 'services':
              return <HistoryDashboard data = {data} />;
          case 'contact':
              return <HistoryDashboard data = {data} />;
          default:
              return <MonthlyDashboard data = {curObject} />;
      }
  };

  return (
      <div className="App bg-gray-900">
        <div className='bg-gray-800 w-full xl:w-11/12 lg:w-auto rounded-2xl'>
          <Navbar onSelect={setSelectedComponent}/>
          <main>
              {renderComponent()}
          </main>
        </div>
      </div>
  );
}

export default App;
