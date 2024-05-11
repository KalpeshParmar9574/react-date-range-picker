// DateRangePicker.tsx
import React, { useEffect, useState } from 'react';
import { StaticDateRangeData } from '../assets/StaticDateRangeData';
import { DateRangePickerProps, DateListOption } from '../interface/DatePickerPropsInterface';
import { addDays, addYears, compareAsc, format, startOfMonth, startOfWeek, startOfYear, sub, subMonths, subYears } from 'date-fns';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

const DateRangePicker: React.FC<DateRangePickerProps> = ({ selectedOptionIndex, onDateSelectionChanged, dateListOptions, selectedDates, dateFormat, minDate, maxDate, }) => {
    const defaultMinDate = subYears(Date(), 10)
    const defaultMaxDate = addYears(Date(), 10)
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
            // const formattedDate = `${updatedDates[0]?.getDate()}/${updatedDates[0]?.getMonth() + 1}/${updatedDates[0]?.getFullYear()} - `;
            // const 
            //  selectedDateRange.selectedDate = `${updatedDates.toLocaleString()} - ${updatedDates.toLocaleString()}`
             StaticDateRangeData.map((item) => {
               if(item.optionLabel === selectedDateRange.optionLabel){
                item.selectedDate = `${format(updatedDates[0] || Date(), 'dd/MM/yyyy')} - ${format(updatedDates[1] || Date(), 'dd/MM/yyyy')}`
               }
             })
             console.log(selectedDateRange.selectedDate, 'sdsd')
        } else {
            const updatedDates = calculateDates(null, selectedDateRange.optionLabel)
            //    console.log(updatedDates, 'dfdf')
            setDates(updatedDates)
            //  selectedDateRange.selectedDate = `${updatedDates.toLocaleString()} - ${updatedDates.toLocaleString()}`
             StaticDateRangeData.map((item) => {
                if(item.optionLabel === selectedDateRange.optionLabel){
                    item.selectedDate = `${format(updatedDates[0] || Date(), 'dd/MM/yyyy')} - ${format(updatedDates[1] || Date(), 'dd/MM/yyyy')}`
                }
              })
        }
        returnValues()
    }, [selectedDateRange]);

    const calculateDates = (diff: number | null, dateLabel: string | null) => {
        const currDate = new Date();
        if (diff) {

            const nextDate = addDays(currDate, diff)
            // console.log(currDate, nextDate)
            return compareAsc(currDate, nextDate) ? [nextDate, currDate] : [currDate, nextDate];
        } else if (dateLabel) {
            // console.log(dateLabel)
            const currDate = new Date();
            let nextDate: Date | null;
            switch (dateLabel) {
                case "Month To Date":
                    nextDate = startOfMonth(currDate);
                    // console.log(nextDate, 'nexr ')
                    break;
                case "Week To Date":
                    nextDate = startOfWeek(currDate);
                    break;
                case "Year To Date":
                    nextDate = startOfYear(currDate);
                    break;
                case "Last Month":
                    nextDate = startOfMonth(subMonths(currDate, 1));
                    currDate.setMonth(currDate.getMonth() - 1);
                    break;
                case "This Month":
                    nextDate = startOfMonth(currDate);
                    break;
                case "Today":
                    nextDate = null;
                    break;
                default:
                    setIsDatePickerVisible(true)
                    return dates;
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
            console.log(StaticDateRangeData)
        }
    }
    const handleUpdateDate = (event: any) => {
        // console.log(event)
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
                onChange={(e) => handleUpdateDate(e.value)}
                selectionMode="range"
                readOnlyInput
                hideOnRangeSelection
                inline
            />
        )}
        </div>
    );
};

export default DateRangePicker;
