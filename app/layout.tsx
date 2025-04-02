import './globals.css'; // Keep if you need custom styles
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container-fluid">
            <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
