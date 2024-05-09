interface DateRangePickerProps {
    selectedOptionIndex: number;
    onDateSelectionChanged: (dateRange: [Date, Date]) => void;
    dateListOptions: DateListOption[];
}

interface DateListOption {
    dateDiff: number;
    isSelected: boolean;
    isVisible: boolean;
    optionKey: number;
    optionLabel: string;
}
export type { DateRangePickerProps, DateListOption };