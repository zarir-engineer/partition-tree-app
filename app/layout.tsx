export const metadata = {
  title: 'Dynamic Tree Ratio Allocator',
  description: 'Manage spinner-based tree UI with smart ratio allocation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800">
        <header className="w-full p-4 bg-blue-700 text-white text-center text-2xl font-semibold shadow-md">
          Tree Ratio Allocator
        </header>
        <main className="p-6 max-w-7xl mx-auto">{children}</main>
        <footer className="text-center text-sm text-gray-500 mt-8 py-4 border-t">
          © 2025 Tree Ratio Tool — All rights reserved.
        </footer>
      </body>
    </html>
  );
}
