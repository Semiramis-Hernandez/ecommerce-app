"use client";
import { GeistSans } from 'geist/font/sans';
import { Toaster } from 'react-hot-toast';
import Header from "../Components/Header/Header";
import NavBar from "../Components/Header/NavBar";
import Footer from "../Components/Footer/Footer";
import "./globals.css";

const RootLayout = ({ children }) => {

  return (
    <html lang="en">
      <body className={GeistSans.className}>
        < Header />
        < NavBar />
        <main>
          {children}
        </main>
        < Footer />
        <Toaster />
      </body>
    </html>
  );
}

export default RootLayout;
