"use client"
import { Autocomplete, TextField } from "@mui/material";
import {usePathname} from 'next-intl/client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TimeZone } from "timezones-list";

export default function TranslateSelector() {

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const languages: any[] = [
    {
      label: "Português",
      code: "pt",
    },
    {
      label: "Inglês",
      code: "en",
    },
  ];

  function changeLanguage(language: any) {
    console.log(language);
    console.log(pathname);
    console.log(`/${language}${pathname}`);
    router.push(`/${language.code}${pathname}`);
  }

  return (
    <Autocomplete
      value={selectedLanguage}
      disablePortal
      options={languages}
      renderInput={(params) => (
        <TextField {...params} label="Language" size="small" />
      )}
      onChange={(event: any, newValue: TimeZone | null) => {
        changeLanguage(newValue);
      }}
    />
  );
}
