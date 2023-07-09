"use client";
import React, { useState } from "react";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import timezones from 'timezones-list';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Home() {

  const [selectedFirstTimeZone, setSelectedFirstTimeZone] = useState(
    timezones[0].tzCode
  );
  const [selectedSecondTimeZone, setSelectedSecondTimeZone] = useState(
    timezones[1].tzCode
  );
  const [resultTime, setResultTime] = useState("Test");

  const selectedTimeZoneOneChange = (event: any) => {
    setSelectedFirstTimeZone(event.target.value);
  };

  const selectedTimeZoneTwoChange = (event: any) => {
    setSelectedSecondTimeZone(event.target.value)
  };

  const timePickerChanged = (event: any) => {
    console.log(dayjs.tz.guess());
  };

  return (
    <Container maxWidth="sm">
      <h1>Convert Time</h1>
      <div>
        <div>
          <p>Time Zone 1</p>
          <FormControl fullWidth>
            <InputLabel id="select-timezone-one">Time Zone 1</InputLabel>
            <Select
              labelId="select-timezone-one"
              id="select-timezone-one"
              label="Time Zone 1"
              onChange={selectedTimeZoneOneChange}
              value={selectedFirstTimeZone}
            >
              {timezones.map((tz) => (
                <MenuItem key={tz.tzCode} value={tz.tzCode}>
                  {tz.tzCode}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <p>Time in Time Zone 1</p>
          <TimePicker
            label="Uncontrolled picker"
            onChange={timePickerChanged}
            defaultValue={dayjs(new Date())}
          />
        </div>
      </div>
      <div>
        <div>
          <p>Time Zone 2</p>
          <FormControl fullWidth>
            <InputLabel id="select-timezone-two">Time Zone 2</InputLabel>
            <Select
              labelId="select-timezone-two"
              id="select-timezone-two"
              label="Time Zone 2"
              onChange={selectedTimeZoneTwoChange}
              value={selectedSecondTimeZone}
            >
              {timezones.map((tz) => (
                <MenuItem key={tz.tzCode} value={tz.tzCode}>
                  {tz.tzCode}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <p>Time in Time Zone s2</p>
          <TextField
            disabled
            id="outlined-disabled"
            label="Disabled"
            defaultValue={resultTime}
          />
        </div>
      </div>
    </Container>
  );
}
