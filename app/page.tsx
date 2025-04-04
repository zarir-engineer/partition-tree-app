'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Dynamic Tree Ratio Allocator
      </h1>
      <p className="text-lg mb-4 text-center max-w-md text-gray-700">
        Welcome! Click below to start managing your dynamic spinner-based family tree UI with smart ratio allocation.
      </p>
      <Link
        href="/tree"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-shadow shadow-md hover:shadow-xl"
      >
        Go to Tree View
      </Link>
    </main>
  );
}
