"use client";
import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import timezones, { TimeZone } from "timezones-list";
import HelpIcon from "@mui/icons-material/Help";

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
    const dateInTimeZoneSelected = timePicker.tz(
      selectedFirstTimeZone?.tzCode,
      true
    );
    const dateConverted = dateInTimeZoneSelected.tz(
      selectedSecondTimeZone?.tzCode
    );
    setResultTime(dateConverted.format("HH:mm"));
  };

  return (
    <Container maxWidth="sm">
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <h1>Time Zone Converter</h1>
          <div>
            <div>
              <Box display="flex" alignItems="center">
                <Tooltip title="Choose the initial local time zone that will be converted">
                  <HelpIcon color="primary" />
                </Tooltip>
                <p>From Local</p>
              </Box>
              <Autocomplete
                value={selectedFirstTimeZone}
                disablePortal
                options={timezones}
                renderInput={(params) => (
                  <TextField {...params} label="From Local" size="small" />
                )}
                onChange={(event: any, newValue: TimeZone | null) => {
                  selectedTimeZoneOneChange(newValue);
                }}
              />
            </div>
            <div>
              <Box display="flex" alignItems="center">
                <Tooltip title="Choose the initial time (Hour and Minute) that will be converted">
                  <HelpIcon color="primary" />
                </Tooltip>
                <p>From Time</p>
              </Box>
              <TimePicker
                label="From Time"
                onChange={timePickerChanged}
                defaultValue={dayjs(new Date())}
              />
            </div>
            <div>
              <Box display="flex" alignItems="center">
                <Tooltip title="Choose which location you want to know the time compared to the previously provided location and time.">
                  <HelpIcon color="primary" />
                </Tooltip>
                <p>To Local</p>
              </Box>
              <Autocomplete
                disablePortal
                options={timezones}
                renderInput={(params) => (
                  <TextField {...params} label="To Local" size="small" />
                )}
                onChange={(event: any, newValue: TimeZone | null) => {
                  selectedTimeZoneTwoChange(newValue);
                }}
              />
            </div>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" onClick={convertAction}>
                Convert
              </Button>
              <div>
                <p>Time Result</p>
                <TextField disabled defaultValue={resultTime} size="small" />
              </div>
            </Box>
          </div>
        </Box>
      </Paper>
    </Container>
  );
}
