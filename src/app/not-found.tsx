// Root-level 404 — shown when no locale prefix is matched.
// The middleware handles locale redirects, so this is rarely reached.
export default function NotFound() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>404 — Page Not Found</h1>
      <p>
        <a href="/">Return to home</a>
      </p>
    </div>
  );
}
