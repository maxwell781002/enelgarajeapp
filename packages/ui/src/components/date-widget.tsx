"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/ui/button";
import { Calendar } from "@repo/ui/components/ui/calendar";
import { FormControl } from "@repo/ui/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";
import { ScrollArea, ScrollBar } from "@repo/ui/components/ui/scroll-area";

export type DateTimePickerProps = {
  value: Date;
  onChange: (value: Date) => void;
};

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  function handleDateSelect(date: Date | undefined) {
    if (date) {
      onChange(date);
    }
  }

  function handleTimeChange(
    type: "hour" | "minute" | "ampm",
    newValue: string,
  ) {
    const currentDate = value || new Date();
    let newDate = new Date(currentDate);
    if (type === "hour") {
      const hour = parseInt(newValue, 10);
      newDate.setHours(newDate.getHours() >= 12 ? hour + 12 : hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(newValue, 10));
    } else if (type === "ampm") {
      const hours = newDate.getHours();
      if (newValue === "AM" && hours >= 12) {
        newDate.setHours(hours - 12);
      } else if (newValue === "PM" && hours < 12) {
        newDate.setHours(hours + 12);
      }
    }
    onChange(newDate);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal",
              !value && "text-muted-foreground",
            )}
          >
            {value ? (
              format(value, "dd/MM/yyyy hh:mm aa")
            ) : (
              <span>DD/MM/YYYY hh:mm aa</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleDateSelect}
            initialFocus
          />
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            <div className="pl-4 sm:hidden">Hora</div>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 12 }, (_, i) => i + 1)
                  .reverse()
                  .map((hour) => (
                    <Button
                      key={hour}
                      size="icon"
                      variant={
                        value && value.getHours() % 12 === hour % 12
                          ? "default"
                          : "ghost"
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() => handleTimeChange("hour", hour.toString())}
                    >
                      {hour}
                    </Button>
                  ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={
                      value && value.getMinutes() === minute
                        ? "default"
                        : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() =>
                      handleTimeChange("minute", minute.toString())
                    }
                  >
                    {minute.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="">
              <div className="flex sm:flex-col p-2">
                {["AM", "PM"].map((ampm) => (
                  <Button
                    key={ampm}
                    size="icon"
                    variant={
                      value &&
                      ((ampm === "AM" && value.getHours() < 12) ||
                        (ampm === "PM" && value.getHours() >= 12))
                        ? "default"
                        : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange("ampm", ampm)}
                  >
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
