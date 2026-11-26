export default function Spinner({ label = "Chargement…", inline = false }) {
  return (
    <span className={inline ? "spinner spinner--inline" : "spinner"} role="status">
      <i aria-hidden="true" />
      {!inline && <span>{label}</span>}
    </span>
  );
}
