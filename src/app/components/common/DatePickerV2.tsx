/* eslint-disable @typescript-eslint/no-explicit-any */

import { DatePicker} from "@mui/x-date-pickers";
import { useRef, useState } from "react";
export function DatePickerV2 (props: Record<string, any>) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<any>(null);
  const [currentView, setCurrentView] = useState<string>("day");
  return (
    <DatePicker
    {...props}
    open={isOpen}
    inputRef={inputRef}
    onClose={() => {
      setIsOpen(false);
      inputRef?.current?.blur();
    }}
    onViewChange={(view) => {
      setCurrentView(view);
    }}
    onChange={(date, context) => {
      if (currentView === "day") {
        props?.onChange(date, context);
      }
    }}
    views={["year", "month", "day"]}
    slotProps={{
      textField: {
        focused:false,
        onMouseDown: () => setIsOpen(true), 
      },
      openPickerButton: {
        onClick: () => setIsOpen(true),
      },
    }}
    />
  )
}