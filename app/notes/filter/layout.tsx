 function FilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: "24px" }}>
      <aside style={{ width: "250px" }}>{sidebar}</aside>

      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

export default FilterLayout