import { DateListOption } from "../interface/DatePickerPropsInterface"

const  StaticDateRangeData: DateListOption[]  = [
    {
        dateDiff: 0,
        isSelected: false,
        isVisible: true,
        optionKey: 1,
        optionLabel: "Today"
    },
    {
        dateDiff: -1,
        isSelected: false,
        isVisible: true,
        optionKey: 1,
        optionLabel: "Yesterday"
    },
    {
        dateDiff: -7,
        isSelected: false,
        isVisible: true,
        optionKey: 1,
        optionLabel: "Last 7 Days"
    },
    {
        dateDiff: -30,
        isSelected: true,
        isVisible: true,
        optionKey: 1,
        optionLabel: "Last 30 Days"
    },
    {
        dateDiff: 0,
        isSelected: false,
        isVisible: true,
        optionKey: 2,
        optionLabel: "Last Month"
    },
    {
        dateDiff: 0,
        isSelected: false,
        isVisible: true,
        optionKey: 3,
        optionLabel: "This Month"
    },
    {
        dateDiff: 0,
        isSelected: false,
        isVisible: true,
        optionKey: 6,
        optionLabel: "Month To Date"
    },
    {
        dateDiff: 0,
        isSelected: false,
        isVisible: false,
        optionKey: 7,
        optionLabel: "Week To Date"
    },
    {
        dateDiff: 0,
        isSelected: false,
        isVisible: true,
        optionKey: 4,
        optionLabel: "Year To Date"
    },
    {
        dateDiff: 0,
        isSelected: false,
        isVisible: true,
        optionKey: 5,
        optionLabel: "Custom Range"
    }
];
export {StaticDateRangeData}