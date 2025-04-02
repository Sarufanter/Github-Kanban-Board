"use client";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "next-themes";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
 {
  
  return (
    <html lang="en" suppressHydrationWarning >
      <body className="bg-gray-50 dark:bg-gray-800">
        <ThemeProvider defaultTheme="system">
          <Provider store={store}>{children}</Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
