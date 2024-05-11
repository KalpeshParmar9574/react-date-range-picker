import React from 'react';
import { PrimeReactProvider } from 'primereact/api';
import DateRangePicker  from './DatePicker/DateRangePicker'


import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import './App.css';
import { DateListOption } from './interface/DatePickerPropsInterface';

function App() {
  const onDateSelectionChanged = (value: any, selectedOption: any) => {
    console.log(value, selectedOption, 'result')
  }
  const dateListOptionCheck = (value:any) => {
    console.log(value)
  }
  return (
    <>
          <PrimeReactProvider>
           <DateRangePicker selectedOptionIndex={0} onDateSelectionChanged={ onDateSelectionChanged } dateListOptions={dateListOptionCheck} selectedDates={[]} dateFormat={''} minDate={undefined} maxDate={undefined}  />
          </PrimeReactProvider>
    </>
  );
}

export default App;
