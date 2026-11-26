export default function Eyebrow({ children }) {
  return (
    <p className="eyebrow">
      <span className="eyebrow__line" />
      {children}
    </p>
  );
}
