'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="fixed inset-0 flex items-center justify-center p-5 w-full">
          <div className="text-center">
            <div className="inline-flex rounded-full bg-red-100 p-4 shadow-lg">
              <div className="rounded-full bg-red-200 p-4">
                <svg className="w-16 h-16" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <circle cx="14" cy="14" r="12" stroke="#DC2626" strokeWidth="2" fill="#FCA5A5" />
                  <path
                    d="M9.5 9.5l9 9M18.5 9.5l-9 9"
                    stroke="#DC2626"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-red-700">Something went wrong!</h2>
            <p className="mt-2 text-gray-700">
              {error?.message || "An unexpected error has occurred. Please try again."}
            </p>
            <button
              className="mt-6 px-6 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-500 active:bg-red-700"
              onClick={() => reset()}
            >
              Try again
            </button>
            <div className="mt-8">
              <p className="text-sm text-gray-400">
                If the problem persists, please contact support or go back to the homepage.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
