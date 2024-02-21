import React from 'react';
import ReactDOM from 'react-dom/client';
import { WrappedApp } from './App';
import { Toaster } from "@/components/ui/toaster"
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <RootLayout>
      <WrappedApp />
    </RootLayout>
  </React.StrictMode>
);

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}