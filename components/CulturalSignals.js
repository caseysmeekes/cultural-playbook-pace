import { buildSignals } from '../data/decisionEngine'

export default function CulturalSignals({ country, activity, industry, buyerType = '', relationshipStage = '', dealStage = '', decisionEnvironment = '', knownChallenge = '', communicationProfile = '' }) {
  const signals = buildSignals({ country, activity, industry, buyerType, relationshipStage, dealStage, decisionEnvironment, knownChallenge, communicationProfile })
  return <div className="cultural-signals">
    {signals.map(signal => <article key={signal.category}>
      <span className="signal-category">{signal.category}</span>
      <h4>SIGNAL</h4><p>{signal.signal}</p>
      <h4>WHAT IT MAY MEAN</h4><p>{signal.meaning}</p>
      <h4>HOW TO TEST</h4><p className="signal-test">{signal.test}</p>
      <h4>WHAT TO DO</h4><p>{signal.action}</p>
      <div className="signal-source"><b>{signal.confidence}</b>{signal.evidenceIds?.length > 0 ? <span>{signal.evidenceIds.length} verified source record{signal.evidenceIds.length === 1 ? '' : 's'} applied.</span> : <span>No verified country-specific evidence for this signal. Treat it as framework guidance.</span>}</div>
      {signal.why && <small className="signal-why">Why you're seeing this: {signal.why}</small>}
    </article>)}
    <div className="signal-principle"><b>Culture gives you a hypothesis.</b><span>The individual gives you the answer.</span></div>
  </div>
}
