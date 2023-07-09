"use client";
import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import timezones, { TimeZone } from "timezones-list";
import { GetStaticProps, InferGetStaticPropsType } from "next";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Home() {
  const [selectedFirstTimeZone, setSelectedFirstTimeZone] = useState<string>(
    dayjs.tz.guess()
  );
  const [selectedSecondTimeZone, setSelectedSecondTimeZone] =
    useState<string>("");
  const [timePicker, setTimePicker] = useState<Dayjs>(dayjs());
  const [resultTime, setResultTime] = useState("Test");

  const selectedTimeZoneOneChange = (event: TimeZone | null) => {
    if (event) setSelectedFirstTimeZone(event.tzCode);
  };

  const selectedTimeZoneTwoChange = (event: TimeZone | null) => {
    if (event) setSelectedSecondTimeZone(event.tzCode);
  };

  const timePickerChanged = (event: Dayjs | null) => {
    if (event) setTimePicker(event);
  };

  const convertAction = () => {
    const dateInTimeZoneSelected = timePicker.tz(selectedFirstTimeZone, true);
    const dateConverted = dateInTimeZoneSelected.tz(selectedSecondTimeZone);
    setResultTime(dateConverted.format("HH:mm"));
  };

  return (
    <Container maxWidth="sm">
      <h1>Convert Time</h1>
      <div>
        <div>
          <p>Time Zone 1</p>
          <Autocomplete
            value={timezones[0]}
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
            id="outlined-disabled"
            label="Disabled"
            defaultValue={resultTime}
          />
        </div>
      </div>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={convertAction}>
          Convert
        </Button>
      </Box>
    </Container>
  );
}
