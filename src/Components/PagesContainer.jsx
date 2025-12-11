export default function PagesContainer({ children, padding }) {
  return (
    <div
      style={{ paddingLeft: padding, paddingRight: padding }}
      className="flex-1 ml-64 min-h-screen bg-neutral-50 py-10 px-20"
    >
      {children}
    </div>
  );
}
