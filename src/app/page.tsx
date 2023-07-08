"use client";
import React, { useState } from "react"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function Home() {
  const countries = [
    {
      id: 1,
      label: "Brazil",
    },
    {
      id: 2,
      label: "Peru",
    },
  ];
  const [selectedFirstCountry, setSelectedFirstCountry] = useState(
    countries[0].id
  );
  const [selectedSecondCountry, setSelectedSecondCountry] = useState(
    countries[1].id
  );
  const [resultTime, setResultTime] = useState("Test");

  const selectedCountryOneChange = (event: any) => {
    const countrySelected = findCountryById(event.target.value);
    if (countrySelected) setSelectedFirstCountry(countrySelected.id);
  };

  const selectedCountryTwoChange = (event: any) => {
    const countrySelected = findCountryById(event.target.value);
    if (countrySelected) setSelectedSecondCountry(countrySelected.id);
  };

  const findCountryById = (id: number) => {
    return countries.find((country) => country.id === id);
  };

  const timePickerChanged = (event: any) => {
    console.log(event);
  };

  return (
    <section>
      {selectedFirstCountry}
      <h1>Convert Time</h1>
      <div>
        <div>
          <p>Country 1</p>
          <FormControl fullWidth>
            <InputLabel id="select-country-one">Country 1</InputLabel>
            <Select
              labelId="select-country-one"
              id="select-country-one"
              label="Country 1"
              onChange={selectedCountryOneChange}
              value={selectedFirstCountry}
            >
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <p>Time in country 1</p>
          <TimePicker
            label="Uncontrolled picker"
            onChange={timePickerChanged}
            defaultValue={dayjs("2022-04-17T15:30")}
          />
        </div>
      </div>
      <div>
        <div>
          <p>Country 2</p>
          <FormControl fullWidth>
            <InputLabel id="select-country-two">Country 2</InputLabel>
            <Select
              labelId="select-country-two"
              id="select-country-two"
              label="Country 2"
              onChange={selectedCountryTwoChange}
              value={selectedSecondCountry}
            >
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <p>Time in country 2</p>
          <TextField
            disabled
            id="outlined-disabled"
            label="Disabled"
            defaultValue={resultTime}
          />
        </div>
      </div>
    </section>
  );
}
