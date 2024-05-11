interface DateRangePickerProps {
    selectedOptionIndex: number | undefined;
    onDateSelectionChanged:  (dateRange: [Date | null, Date | null], selectedOption: DateListOption) => void;
    dateListOptions: (dateList:DateListOption[] ) => void ;
    selectedDates: Date[] | undefined;
    dateFormat: string | undefined;
    minDate: Date | undefined;
    maxDate: Date | undefined;
    // dateDropDownOptions: 
}

interface DateListOption {
    dateDiff: number;
    isSelected: boolean;
    isVisible: boolean;
    optionKey: number;
    optionLabel: string;
}
export type { DateRangePickerProps, DateListOption };