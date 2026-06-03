export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        html, body { margin: 0; padding: 0; }
        body { font-family: -apple-system, system-ui, sans-serif; background: #f6f3ec; color: #171717; -webkit-font-smoothing: antialiased; }
      `}</style>
      {children}
    </>
  )
}
