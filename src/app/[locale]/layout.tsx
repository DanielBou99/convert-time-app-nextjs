import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ReactNode } from "react";
import Header from "../components/header/Header";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pt" }];
}

async function getMessages(locale: string) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  const messages = await getMessages(locale);

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          {children}
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
