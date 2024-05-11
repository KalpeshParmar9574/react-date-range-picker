// DateRangePicker.tsx
import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { StaticDateRangeData } from "../assets/StaticDateRangeData";
import {
  DateListOption,
  DateRangePickerProps,
} from "../interface/DatePickerPropsInterface";
import "primereact/resources/themes/saga-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  selectedOptionIndex,
  onDateSelectionChanged,
  dateListOptions,
}) => {
  const [selectedOption, setSelectedOption] = useState<DateListOption>(
    StaticDateRangeData[selectedOptionIndex || 3]
  );
  const [dates, setDates] = useState({ start: new Date(), end: new Date() });

  // Set the second calendar to one month ahead
  useEffect(() => {
    const nextMonth = new Date(dates.start);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setDates((prevDates) => ({
      ...prevDates,
      end: nextMonth,
    }));
  }, [dates.start]);

  const handleDateChange = (key: "start" | "end", value: Date) => {
    setDates((prevDates) => ({
      ...prevDates,
      [key]: value,
    }));
  };

  useEffect(() => {
    applyDateChange(selectedOption);
  }, [selectedOption]);

  const applyDateChange = (option: DateListOption) => {
    const today = new Date();
    let start = new Date();
    let end = new Date();

    switch(option.optionLabel) {
      case "Today":
      case "Yesterday":
        start.setDate(today.getDate() + option.dateDiff);
        end = new Date(start);
        break;
      case "Last 7 Days":
      case "Last 30 Days":
        start.setDate(today.getDate() + option.dateDiff);
        break;
      case "Last Month":
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case "This Month":
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case "Month To Date":
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case "Year To Date":
        start = new Date(today.getFullYear(), 0, 1);
        break;
      default:
        break;
    }

    setDates({ start, end });
  };

  const formatDate = (date: Date): string => date.toLocaleDateString(); // Format as needed

  const formattedDateRange = (): string => {
    const { start, end } = dates;
    return `${formatDate(start)} - ${formatDate(end)}`;
  };
  const [isVisible, setIsVisible] = useState(false);
  const [activeItem, setActiveItem] = useState(null);


  const handleDropdownChange = (value: any) => {
    console.log("e", value);
    setSelectedOption(value);
    setActiveItem(value)

    if (value.optionLabel === "Custom Range") {
    }
  };
  const handleMonthChange = (key: "start" | "end", value: Date) => {
    setDates((prevDates) => ({
      ...prevDates,
      [key]: value,
    }));
  };
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div>
      <div className="my-5 ml-5">
        <InputText
          value={formattedDateRange()}
          className="w-full"
          onClick={toggleVisibility}
        />
        <div className="flex">
          <div>
            {isVisible && (
              <ul className="p-0 mt-0 option-list">
                {StaticDateRangeData.map((item, index) => (
                  <li
                  key={index}
                  // className="flex justify-content-between white-space-normal cursor-pointer m-0 py-2"
                    className={`flex justify-content-between white-space-normal cursor-pointer m-0 py-2 ${activeItem === item ? 'active' : ''}`}

                    onClick={(e) => handleDropdownChange(item)}
                  >
                    {item.optionLabel}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="ml-4">
            {selectedOption.optionLabel === "Custom Range" && (
              <div className="flex">
                <Calendar
                  value={dates.start}
                  onChange={(e) => handleDateChange("start", e.value as Date)}
                  onViewDateChange={(e) =>
                    handleMonthChange("start", e.value as Date)
                  }
                  inline
                />
                <Calendar
                  value={dates.end}
                  onChange={(e) => handleDateChange("end", e.value as Date)}
                  onViewDateChange={(e) =>
                    handleMonthChange("end", e.value as Date)
                  }
                  inline
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
