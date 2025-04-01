// layout.tsx
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="two-columns">
          <div className="column">
            {children} {/* This renders the content from page.tsx */}
          </div>
          <div className="column">
            <h2>Nodes</h2>
          </div>
        </div>
      </body>
    </html>
  );
}
