// DateRangePicker.tsx
import React, { useEffect, useState } from 'react';
import { StaticDateRangeData } from '../assets/StaticDateRangeData';
import { DateRangePickerProps, DateListOption } from '../interface/DatePickerPropsInterface';
import { addDays, addYears, compareAsc, endOfMonth, format, startOfMonth, startOfYear, subMonths, subYears } from 'date-fns';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

const DateRangePicker: React.FC<DateRangePickerProps> = ({ selectedOptionIndex, onDateSelectionChanged, dateListOptions, selectedDates, dateFormat, minDate, maxDate, }) => {
    const defaultMinDate = minDate ||  subYears(Date(), 10)
    const defaultMaxDate = maxDate || addYears(Date(), 10)
    console.log(defaultMaxDate, 'default')
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [selectedDateRange, setselectedDateRange] = useState(StaticDateRangeData[selectedOptionIndex || 0]);
    const [dates, setDates] = useState<(Date | null)[]>(selectedDates || []);
    const handleSelectedDateOption = (value: DateListOption) => {
        setselectedDateRange(value)
    }
    useEffect(() => {
        if (selectedDateRange.dateDiff) {
            const updatedDates = calculateDates(selectedDateRange.dateDiff, null)
            setDates(updatedDates)  
             StaticDateRangeData.map((item) => {
               if(item.optionLabel === selectedDateRange.optionLabel){
                item.selectedDate =  convertDateToString(updatedDates as [Date | null, Date | null])
               }
             })
        } else if(selectedDateRange.optionLabel === "Custom Range"){
                setIsDatePickerVisible(true);
                    setDates([])
        }else{
            const updatedDates = calculateDates(null, selectedDateRange.optionLabel)
            setDates(updatedDates)
            //  selectedDateRange.selectedDate = `${updatedDates.toLocaleString()} - ${updatedDates.toLocaleString()}`
             StaticDateRangeData.map((item) => {
                if(item.optionLabel === selectedDateRange.optionLabel){
                    item.selectedDate = convertDateToString(updatedDates as [Date | null, Date | null])
                }
              })
        }
    }, [selectedDateRange]);
    useEffect(() => {
        if(selectedDateRange.optionLabel === "Custom Range"){
            console.log(dates, 'selcted dates ')
          const dateString =  convertDateToString(dates as [Date | null, Date | null])
          StaticDateRangeData.map((item) => {
              if(item.optionLabel === "Custom Range"){
                  console.log(dateString, 'string')
                  item.selectedDate = dateString;
                }
              })
        }
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
                    nextDate = null;
                    break;
                default:
                    console.error('Invalid option label. Please provide a valid option.');
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
    return (
        <div className='mt-5'>
                <Dropdown value={selectedDateRange} onChange={(e) => handleSelectedDateOption(e.value)} options={StaticDateRangeData} optionLabel="optionLabel"
                     placeholder="Select a City" className="w-full"
                     valueTemplate={(option:any) => option.selectedDate}
                     />
           {(selectedDateRange.optionLabel === "Custom Range" && isDatePickerVisible ) && (
                    <Calendar
                className='mt-2'
                dateFormat={dateFormat || "dd/mm/yy"}
                value={dates}
                minDate={defaultMinDate}
                maxDate={defaultMaxDate}
                onChange={(e) => handleUpdateDate(e.value)}
                selectionMode="range"
                readOnlyInput
                numberOfMonths={2}
                hideOnRangeSelection
                inline
            />
                    )}
        </div>
    );
};

export default DateRangePicker;
