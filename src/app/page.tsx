"use client";
import { Select, Option } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import "tw-elements/dist/css/tw-elements.min.css";
import { Datepicker, Input, initTE, Timepicker } from "tw-elements";

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

  const [selectedFirstCountry, setSelectedFirstCountry] = useState("");
  const [selectedSecondCountry, setSelectedSecondCountry] = useState("");

  useEffect(() => {
    initTE({ Datepicker, Input, Timepicker });
  }, []);

  return (
    <section>
      <h1 className="font-bold text-4xl mb-4">Convert Time</h1>

      <div className="flex flex-row items-center">
        <div>
          <p>Country 1</p>
          <div className="w-72">
            <Select
              onChange={(event: any) => setSelectedFirstCountry(event)}
              label="Select Country One"
            >
              {countries.map((country) => (
                <Option key={country.id} value={String(country.id)}>
                  {country.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="ml-1.5">
          <p>Time in country 1</p>
          <div
            className="relative"
            data-te-timepicker-init
            data-te-input-wrapper-init
          >
            <input
              type="text"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="form1"
            />
            <label
              htmlFor="form1"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            >
              Select a time
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center">
        <div>
          <p>Country 2</p>
          <div className="w-72">
            <Select
              onChange={(event: any) => setSelectedSecondCountry(event)}
              label="Select Country Two"
            >
              {countries.map((country) => (
                <Option key={country.id} value={String(country.id)}>
                  {country.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="ml-1.5">
          <p>Time in country 2</p>
          <div>
            <input
              type="text"
              className="peer block min-h-[auto] w-full rounded border-0 bg-neutral-100 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:bg-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              placeholder="Disabled input"
              aria-label="Result time"
              disabled
              value="Result"/>
          </div>
        </div>
      </div>
    </section>
  );
}
