// layout.tsx
import './globals.css'; // Import global styles

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Use grid layout with 8 columns */}
        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-8">
            {children} {/* This renders the content from page.tsx */}
          </div>
        </div>
      </body>
    </html>
  );
}
