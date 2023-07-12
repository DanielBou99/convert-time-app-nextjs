"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  IconButton,
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
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTranslations } from "next-intl";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

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

  const t = useTranslations("Index");

  const copyResult = () => {
    navigator.clipboard.writeText(resultTime);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
              <h1>{t("title")}</h1>
              <div>
                <div>
                  <Box display="flex" alignItems="center">
                    <Tooltip title={t("helpFromLocal")} enterTouchDelay={0}>
                      <HelpIcon color="primary" />
                    </Tooltip>
                    <p>{t("fromLocal")}</p>
                  </Box>
                  <Autocomplete
                    value={selectedFirstTimeZone}
                    disablePortal
                    options={timezones}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("fromLocal")}
                        size="small"
                      />
                    )}
                    onChange={(event: any, newValue: TimeZone | null) => {
                      selectedTimeZoneOneChange(newValue);
                    }}
                  />
                </div>
                <div>
                  <Box display="flex" alignItems="center">
                    <Tooltip title={t("helpFromTime")} enterTouchDelay={0}>
                      <HelpIcon color="primary" />
                    </Tooltip>
                    <p>{t("fromTime")}</p>
                  </Box>
                  <TimePicker
                    label={t("fromTime")}
                    onChange={timePickerChanged}
                    defaultValue={dayjs(new Date())}
                  />
                </div>
                <div>
                  <Box display="flex" alignItems="center">
                    <Tooltip title={t("helpToLocal")} enterTouchDelay={0}>
                      <HelpIcon color="primary" />
                    </Tooltip>
                    <p>{t("toLocal")}</p>
                  </Box>
                  <Autocomplete
                    disablePortal
                    options={timezones}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("toLocal")}
                        size="small"
                      />
                    )}
                    onChange={(event: any, newValue: TimeZone | null) => {
                      selectedTimeZoneTwoChange(newValue);
                    }}
                  />
                </div>
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" onClick={convertAction}>
                    {t("convert")}
                  </Button>
                  <div>
                    <p>{t("timeResult")}</p>
                    <TextField
                      disabled
                      defaultValue={resultTime}
                      size="small"
                    />
                    <IconButton onClick={copyResult}>
                      <ContentCopyIcon />
                    </IconButton>
                  </div>
                </Box>
              </div>
            </Box>
          </Paper>
        </Container>
      </LocalizationProvider>
    </>
  );
}
