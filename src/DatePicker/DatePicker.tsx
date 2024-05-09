// DateRangePicker.tsx
import React, { useState } from 'react';
import { StaticDateRangeData } from '../assets/StaticDateRangeData';
import { DateRangePickerProps, DateListOption } from '../interface/DatePickerPropsInterface';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

const DateRangePicker: React.FC<DateRangePickerProps> = ({ selectedOptionIndex, onDateSelectionChanged, dateListOptions }) => {
    // Implement your date picker component here
    const [selectedCity, setSelectedCity] = useState(StaticDateRangeData[0]);
    const [dates, setDates] = useState<(Date | null)[]>([]);
    const handleSelectedDateOption = (value: DateListOption) => {
        console.log(value, 'selectedValues')
    }
    return (
        <div>
            <Dropdown value={selectedCity} onChange={(e) => handleSelectedDateOption(e.value)} options={StaticDateRangeData} optionLabel="optionLabel"
                editable placeholder="Select a City" className="w-full md:w-14rem" />
            <Calendar value={dates} onChange={(e) => setDates(e.value as (Date | null)[])} selectionMode="range" readOnlyInput hideOnRangeSelection />
        </div>
    );
};

export default DateRangePicker;
