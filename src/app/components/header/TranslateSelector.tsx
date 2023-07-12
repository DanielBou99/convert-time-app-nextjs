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
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

interface ILanguage {
  label: string;
  code: string;
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

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
        <InputLabel id="language-select">{t("language")}</InputLabel>
        <Select
          labelId="language-select"
          id="language-select"
          value={selectedLanguage}
          label={t("language")}
          onChange={changeLanguage}
          input={<BootstrapInput />}
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
