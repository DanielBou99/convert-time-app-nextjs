"use client";
import React, { useEffect, useState } from "react";
import { Autocomplete, Box, Button, Container, TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import timezones, { TimeZone } from "timezones-list";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Home() {
  const [selectedFirstTimeZone, setSelectedFirstTimeZone] =
    useState<TimeZone | null>(null);
  const [selectedSecondTimeZone, setSelectedSecondTimeZone] =
    useState<TimeZone | null>(null);
  const [timePicker, setTimePicker] = useState<Dayjs>(dayjs());
  const [resultTime, setResultTime] = useState("");

  useEffect(() => {
    const timeZoneUser: string = dayjs.tz.guess();
    const timeZoneFound: TimeZone | undefined = timezones.find(
      (tz) => tz.tzCode === timeZoneUser
    );
    if (timeZoneFound) setSelectedFirstTimeZone(timeZoneFound);
  }, []);

  const selectedTimeZoneOneChange = (event: TimeZone | null) => {
    if (event) setSelectedFirstTimeZone(event);
  };

  const selectedTimeZoneTwoChange = (event: TimeZone | null) => {
    if (event) setSelectedSecondTimeZone(event);
  };

  const timePickerChanged = (event: Dayjs | null) => {
    if (event) setTimePicker(event);
  };

  const convertAction = () => {
    const dateInTimeZoneSelected = timePicker.tz(selectedFirstTimeZone?.tzCode, true);
    const dateConverted = dateInTimeZoneSelected.tz(selectedSecondTimeZone?.tzCode);
    setResultTime(dateConverted.format("HH:mm"));
  };

  return (
    <Container maxWidth="sm">
      <h1>Convert Time</h1>
      <div>
        <div>
          <p>Time Zone 1</p>
          <Autocomplete
            value={selectedFirstTimeZone}
            disablePortal
            options={timezones}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Time Zone 1" />
            )}
            onChange={(event: any, newValue: TimeZone | null) => {
              selectedTimeZoneOneChange(newValue);
            }}
          />
        </div>
        <div>
          <p>Time in Time Zone 1</p>
          <TimePicker
            label="Time in Time Zone 1"
            onChange={timePickerChanged}
            defaultValue={dayjs(new Date())}
          />
        </div>
      </div>
      <div>
        <div>
          <p>Time Zone 2</p>
          <Autocomplete
            disablePortal
            options={timezones}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Time Zone 2" />
            )}
            onChange={(event: any, newValue: TimeZone | null) => {
              selectedTimeZoneTwoChange(newValue);
            }}
          />
        </div>
        <div>
          <p>Time in Time Zone 2</p>
          <TextField
            disabled
            defaultValue={resultTime}
          />
        </div>
      </div>
      <Box sx={{ mt: 2}}>
        <Button variant="contained" onClick={convertAction}>
          Convert
        </Button>
      </Box>
    </Container>
  );
}
