import localFont from "next/font/local";
import { inter, worksans, playfair_display } from '../app/fonts/fonts';
import "./style/main.scss";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Crochet & Knit",
  description: "Baby Boutique",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair_display.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
