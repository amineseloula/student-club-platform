export default function Placeholder({ title }) {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>{title}</h1>
          <p>Cette page sera disponible prochainement.</p>
        </div>
      </div>
      <div className="card placeholder">À venir.</div>
    </>
  );
}
