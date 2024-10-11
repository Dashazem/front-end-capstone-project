import localFont from "next/font/local";
import { inter, worksans, playfair_display } from '../fonts/fonts';
import "../style/main.scss";
import ReduxProvider from '../store/redux-provider';
import NavBar from '../components/navigation/navbar';
import Footer from '../components/navigation/footer';



const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Crochet & Knit",
  description: "Baby Boutique",
};



export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${playfair_display.className} antialiased`}
        >
          <NavBar />
          {children}
          <Footer />
        </body>
      </html>
    </ReduxProvider>
  );
}

