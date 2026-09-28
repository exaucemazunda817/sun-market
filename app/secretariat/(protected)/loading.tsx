export default function Loading() {
  return (
    <div role="status" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="h-7 w-48 animate-pulse rounded-lg bg-sun-navy-100" />
      <div className="mt-6 space-y-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-16 animate-pulse rounded-xl bg-white ring-1 ring-sun-line" />
        ))}
      </div>
      <span className="sr-only">Chargement des dossiers…</span>
    </div>
  );
}
