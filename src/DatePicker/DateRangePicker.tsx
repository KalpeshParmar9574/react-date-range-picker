// DateRangePicker.tsx
import React, { useEffect, useState } from 'react';
import { StaticDateRangeData } from '../assets/StaticDateRangeData';
import { DateRangePickerProps, DateListOption } from '../interface/DatePickerPropsInterface';
import { addDays, addYears, compareAsc, endOfMonth, format, startOfMonth, startOfYear, subMonths, subYears } from 'date-fns';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
        

const DateRangePicker: React.FC<DateRangePickerProps> = ({ selectedOptionIndex, onDateSelectionChanged, dateListOptions, selectedDates, dateFormat, minDate, maxDate, }) => {
    const defaultMinDate = minDate ||  subYears(Date(), 10)
    const defaultMaxDate = maxDate || addYears(Date(), 10)
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [selectedDateRange, setselectedDateRange] = useState(StaticDateRangeData[selectedOptionIndex || 0]);
    const [dates, setDates] = useState<(Date | null)[]>(selectedDates || []);
    const [dateStringLabel, setDateStringLabel] = useState("")
    const handleSelectedDateOption = (value: DateListOption) => {
        setselectedDateRange(value)
    }
    useEffect(() => {
        if (selectedDateRange.dateDiff) {
            const updatedDates = calculateDates(selectedDateRange.dateDiff, null)
            setDates(updatedDates)  
            const dateString = convertDateToString(updatedDates as [Date | null, Date | null]);
            setDateStringLabel(dateString)
        } else if(selectedDateRange.optionLabel === "Custom Range"){
                setIsDatePickerVisible(true);
                setDates([])
        }else{
            const updatedDates = calculateDates(null, selectedDateRange.optionLabel)
            setDates(updatedDates)
            const dateString = convertDateToString(updatedDates as [Date | null, Date | null]);
            setDateStringLabel(dateString)
        }
    }, [selectedDateRange]);
    useEffect(() => {
        if(selectedDateRange.optionLabel === "Custom Range"){
            const dateString =  convertDateToString(dates as [Date | null, Date | null])
            setDateStringLabel(dateString)
            if( dates && dates[1]){
                setIsDatePickerVisible(false)
            }
        }
        setselectedDateRange(selectedDateRange);
        returnValues()
    },[dates])
    const convertDateToString = (dates: [Date | null, Date| null]) => {
            const startDate = dates[0]
            const endDate = dates[1];
            let dateString: string;
            if(endDate){
                 dateString = `${format(startDate || Date(), dateFormat || 'dd/MM/yyyy')} - ${format(endDate || Date(),  dateFormat || 'dd/MM/yyyy')}`
                 return dateString
            }else{
                 dateString = `${format(startDate || Date(),dateFormat ||  'dd/MM/yyyy')}`
                 return dateString
            }
    }
    const calculateDates = (diff: number | null, dateLabel: string | null) => {
        const currDate = new Date();
        if (diff) {

            const nextDate = addDays(currDate, diff)
            return compareAsc(currDate, nextDate) ? [nextDate, currDate] : [currDate, nextDate];
        } else if (dateLabel) {
            let currDate = new Date();
            let nextDate: Date | null;
            switch (dateLabel) {
                case "Month To Date":
                    nextDate = startOfMonth(currDate);
                    break;
                case "Year To Date":
                    nextDate = startOfYear(currDate);
                    break;
                case "Last Month":
                    nextDate = startOfMonth(subMonths(currDate, 1));
                    currDate = endOfMonth(subMonths(currDate, 1));
                    break;
                case "This Month":
                    nextDate = startOfMonth(currDate);
                    currDate = endOfMonth(currDate);
                    break;
                case "Today":
                    nextDate = currDate;
                    break;
                default:
                    return [currDate, currDate];
            }
            return nextDate ? compareAsc(currDate, nextDate) ? [nextDate, currDate] : [currDate, nextDate] : [currDate, null];
        } else {
            return [currDate, currDate]
        }
    }
    const returnValues = () => {
        let userSelectedDates: any = dates || [null, null]
        onDateSelectionChanged(userSelectedDates, selectedDateRange)
        if (dateListOptions !== undefined) {
            StaticDateRangeData.map((item: DateListOption) => {
                if (item.optionLabel === selectedDateRange.optionLabel) {
                    item.isSelected = true;
                    item.isVisible = true;
                }
                return item; // Return the modified item
            });
        }
    }
    const handleUpdateDate = (event: any) => {
        setDates(event)
    }

    const handleClear = (event:any) =>{
        event.stopPropagation();
        setDates([])
        // selectedDateRange.selectedDate="";
        setDateStringLabel("")
        setIsDatePickerVisible(false)
    }
    const dropdownValueTemplate = (option:any) => {
        return (
            <div className="flex"  style={{ cursor: 'pointer', marginLeft: 'auto' }}>
               {dateStringLabel}
                <i className="pi pi-times flex-end" onClick={(e) => handleClear(e)} style={{ cursor: 'pointer', marginLeft: 'auto' }}></i>
                
                <i className="pi pi-calendar ml-2 flex-end" style={{ fontSize: '1.2rem' }}></i>
            </div>
        );
    }
    return (
        
        <PrimeReactProvider>
          <label htmlFor="dateRangePicker" className="font-bold block mb-2">
                    Date Range
                </label>
                <Dropdown id="dateRangePicker" value={selectedDateRange} onChange={(e) => handleSelectedDateOption(e.value)} options={StaticDateRangeData} optionLabel="optionLabel"
                     placeholder="Select a City" className="" 
                     valueTemplate={dropdownValueTemplate}
                     dropdownIcon="none"
                     />
           {(selectedDateRange.optionLabel === "Custom Range" && isDatePickerVisible ) && (
            <> 
            <Calendar
                className="mt-2"
                dateFormat="dd/mm/yy"
                value={dates}
                onChange={(e) => handleUpdateDate(e.value)}
                selectionMode="range"
                readOnlyInput
                numberOfMonths={2}
                minDate={defaultMinDate}
                maxDate={defaultMaxDate}
                hideOnRangeSelection
                inline
            />
            </>
                    )}
        </PrimeReactProvider>
    );
};

export default DateRangePicker;
