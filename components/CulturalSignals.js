import { buildSignals } from '../data/decisionEngine'

export default function CulturalSignals({ country, activity, industry }) {
  const signals = buildSignals({ country, activity, industry })
  return <div className="cultural-signals">
    {signals.map(signal => <article key={signal.category}>
      <span className="signal-category">{signal.category}</span>
      <h4>SIGNAL</h4><p>{signal.signal}</p>
      <h4>WHAT IT MAY MEAN</h4><p>{signal.meaning}</p>
      <h4>HOW TO TEST</h4><p className="signal-test">{signal.test}</p>
      <h4>WHAT TO DO</h4><p>{signal.action}</p>
      {signal.evidenceIds?.length > 0 && <small className="signal-source">Source-backed cue: {signal.evidenceIds.length} verified evidence record{signal.evidenceIds.length === 1 ? '' : 's'} applied.</small>}
    </article>)}
    <div className="signal-principle"><b>Culture gives you a hypothesis.</b><span>The individual gives you the answer.</span></div>
  </div>
}
