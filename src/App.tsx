import React from 'react';
import { PrimeReactProvider } from 'primereact/api';
import DateRangePicker  from './DatePicker/DatePicker'


import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import './App.css';

function App() {
  return (
    <>
          <PrimeReactProvider>
           <DateRangePicker selectedOptionIndex={0} onDateSelectionChanged={function (dateRange: [Date, Date]): void {
          throw new Error('Function not implemented.');
        } } dateListOptions={[]} />
          </PrimeReactProvider>
    </>
  );
}

export default App;
