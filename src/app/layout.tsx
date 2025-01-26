import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { cookies } from "next/headers";
import { LanguageProvider } from "@/context/LanguageContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tech Start",
  description: "Tech Start is a tech company that provides advanced training programs.",
};

export const runtime = 'nodejs';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const language = cookieStore.get('NEXT_LOCALE')?.value as 'en' | 'ar' || 'en';
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={language} dir={dir} className="lenis lenis-smooth" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-sans antialiased ${language === 'ar' ? 'rtl' : ''}`}>
        <LanguageProvider initialLanguage={language}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
