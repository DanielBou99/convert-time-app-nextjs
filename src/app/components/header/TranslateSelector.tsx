"use client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";

interface ILanguage {
  label: string;
  code: string;
}

export default function TranslateSelector() {
  const [cookies, setCookie] = useCookies();
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(
    cookies.NEXT_LOCALE
  );
  const [allLanguages, setAllLanguages] = useState<ILanguage[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("TranslateSelector");

  const languages: ILanguage[] = [
    {
      label: "labelPt",
      code: "codePt",
    },
    {
      label: "labelEn",
      code: "codeEn",
    },
  ];

  useEffect(() => {
    const languagesAux: ILanguage[] = languages.map((language) => {
      return {
        ...language,
        label: t("languages." + language.label),
        code: t("languages." + language.code),
      };
    });
    setAllLanguages(languagesAux);
  }, []);

  function changeLanguage(event: SelectChangeEvent) {
    const language = event.target.value as string;
    router.push(`/${language}${pathname}`);
  }

  return (
    <CookiesProvider>
      <FormControl fullWidth>
        <InputLabel id="language-select">Language</InputLabel>
        <Select
          labelId="language-select"
          id="language-select"
          value={selectedLanguage}
          label="Language"
          onChange={changeLanguage}
        >
          {allLanguages.map((lang) => (
            <MenuItem value={lang.code} key={lang.code}>
              {lang.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </CookiesProvider>
  );
}
