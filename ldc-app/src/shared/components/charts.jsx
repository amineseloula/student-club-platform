/* Small dependency-free SVG charts, themed with the club colors. */
const W = 640;
const COLORS = { green: "var(--green)", yellow: "var(--yellow)", blue: "var(--blue)", red: "var(--red)", navy: "var(--navy)" };
export const color = (c) => COLORS[c] ?? c;

/* Round the axis maximum up to a clean value so 4 ticks land on whole numbers. */
function niceMax(maxVal) {
  const raw = Math.max(maxVal, 1) / 4;
  const k = 10 ** Math.floor(Math.log10(raw));
  const r = raw / k;
  const step = ([1, 2, 3, 4, 5, 6, 8, 10].find((n) => n >= r) ?? 10) * k;
  return Math.max(step, 1) * 4;
}

function Axes({ max, padL, padR, padT, innerH, height, labels, xAt }) {
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => {
        const v = (max / 4) * i;
        const y = padT + innerH - (v / max) * innerH;
        return (
          <g key={i}>
            <line x1={padL} x2={W - padR} y1={y} y2={y} className="chart__grid" />
            <text x={padL - 8} y={y + 4} textAnchor="end" className="chart__tick">{Math.round(v)}</text>
          </g>
        );
      })}
      {labels.map((l, i) => (
        <text key={l} x={xAt(i)} y={height - 10} textAnchor="middle" className="chart__tick">{l}</text>
      ))}
    </>
  );
}

export function BarChart({ data, fill = "green", height = 240, unit = "", label }) {
  const padL = 40, padR = 12, padT = 12, padB = 32;
  const innerW = W - padL - padR, innerH = height - padT - padB;
  const max = niceMax(Math.max(...data.map((d) => d.value)));
  const bw = innerW / data.length;
  const xAt = (i) => padL + i * bw + bw / 2;
  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="chart" role="img" aria-label={label}>
      <Axes {...{ max, padL, padR, padT, innerH, height, xAt }} labels={data.map((d) => d.label)} />
      {data.map((d, i) => {
        const h = (d.value / max) * innerH;
        return (
          <rect key={d.label} x={xAt(i) - bw * 0.3} y={padT + innerH - h} width={bw * 0.6} height={Math.max(h, 0)} rx="4" style={{ fill: color(fill) }}>
            <title>{`${d.label} : ${d.value}${unit}`}</title>
          </rect>
        );
      })}
    </svg>
  );
}

export function LineChart({ data, stroke = "blue", height = 240, unit = "", label }) {
  const padL = 40, padR = 20, padT = 12, padB = 32;
  const innerW = W - padL - padR, innerH = height - padT - padB;
  const max = niceMax(Math.max(...data.map((d) => d.value)));
  const step = innerW / Math.max(data.length - 1, 1);
  const xAt = (i) => padL + i * step;
  const yAt = (v) => padT + innerH - (v / max) * innerH;
  const pts = data.map((d, i) => `${xAt(i)},${yAt(d.value)}`);
  const area = `${xAt(0)},${padT + innerH} ${pts.join(" ")} ${xAt(data.length - 1)},${padT + innerH}`;
  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="chart" role="img" aria-label={label}>
      <Axes {...{ max, padL, padR, padT, innerH, height, xAt }} labels={data.map((d) => d.label)} />
      <polygon points={area} style={{ fill: color(stroke), opacity: 0.12 }} />
      <polyline points={pts.join(" ")} fill="none" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" style={{ stroke: color(stroke) }} />
      {data.map((d, i) => (
        <circle key={d.label} cx={xAt(i)} cy={yAt(d.value)} r="4.5" className="chart__dot" style={{ stroke: color(stroke) }}>
          <title>{`${d.label} : ${d.value}${unit}`}</title>
        </circle>
      ))}
    </svg>
  );
}

/* data: [{ name, value, color }] */
export function DonutChart({ data, centerValue, centerLabel, size = 200 }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = 70, c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="donut2" style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" role="img" aria-label={`Répartition : ${data.map((d) => `${d.name} ${Math.round((d.value / total) * 100)}%`).join(", ")}`}>
        <circle cx="100" cy="100" r={r} fill="none" strokeWidth="32" className="donut2__track" />
        {data.map((d) => {
          const len = (d.value / total) * c;
          const el = (
            <circle key={d.name} cx="100" cy="100" r={r} fill="none" strokeWidth="32"
              strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-offset}
              transform="rotate(-90 100 100)" style={{ stroke: color(d.color) }}>
              <title>{`${d.name} : ${d.value}`}</title>
            </circle>
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="donut__center"><strong>{centerValue}</strong><span>{centerLabel}</span></div>
    </div>
  );
}

/* rows: [{ name, amount }] */
export function HBars({ rows, fill = "green", format }) {
  const max = Math.max(...rows.map((r) => r.amount), 1);
  return (
    <ul className="hbars">
      {rows.map((r) => (
        <li key={r.name}>
          <span className="hbars__name">{r.name}</span>
          <span className="hbars__track"><i style={{ width: `${(r.amount / max) * 100}%`, background: color(fill) }} /></span>
          <b>{format(r.amount)}</b>
        </li>
      ))}
    </ul>
  );
}
