import { buildYourPlay } from '../data/decisionEngine'

export default function YourPlay({ country, activity, industry, buyerType = '', relationshipStage = '', dealStage = '', decisionEnvironment = '', knownChallenge = '', communicationProfile = '' }) {
  const play = buildYourPlay({ country, activity, industry, buyerType, relationshipStage, dealStage, decisionEnvironment, knownChallenge, communicationProfile })
  const items = [['DO', play.do], ['DON’T', play.dont], ['ASK', play.ask], ['BRING', play.bring], ['WATCH', play.watch], ['NEXT', play.next]]
  const insights = play.actionable?.insights || []

  return <div className="your-play">
    <div className="your-play-actionable">
      <div className="your-play-actionable-head"><div><small>3A · ACTIONABLE SALES INSIGHTS</small><h3>{play.actionable?.headline || 'Turn the cultural insight into a sales move.'}</h3></div><span>{insights.length} moves</span></div>
      <p className="your-play-principle">Use these as hypotheses to test in the interaction, not predictions about the individual.</p>
      <div className="your-play-insights">
        {insights.map(insight => <article key={`${insight.rank}-${insight.pillar}`}>
          <div className="insight-top"><b>{insight.rank}</b><span>{insight.pillarName}</span><em>{insight.confidence}</em></div>
          <h4>{insight.title}</h4>
          <div className="insight-grid">
            <div><small>WHEN YOU SEE</small><p>{insight.trigger}</p></div>
            <div><small>DO THIS</small><p>{insight.action}</p></div>
            <div><small>ASK THIS</small><p>“{insight.phrase}”</p></div>
            <div><small>WHY</small><p>{insight.why}</p></div>
          </div>
          {insight.sourceIds?.length > 0 && <small className="insight-source">Source evidence: {insight.sourceIds.join(', ')}</small>}
        </article>)}
      </div>
    </div>

    <div className="your-play-grid">
      {items.map(([label, text]) => <article key={label}><span>{label}</span><p>{text}</p></article>)}
    </div>
    <div className="your-play-context"><b>{play.context}</b><span>{play.industryLens}</span></div>
    <div className="your-play-source"><b>{play.sourceConfidence}</b><span>{play.sourceEvidenceIds?.length ? `${play.sourceEvidenceIds.length} verified source record${play.sourceEvidenceIds.length === 1 ? '' : 's'} applied.` : 'No verified country-specific evidence for this scenario; framework guidance is shown.'}</span></div>
    {play.sourceTrace?.map((trace, i) => <small key={i}>{trace}</small>)}
    <style jsx>{`
      .your-play-actionable{margin-bottom:18px;padding:18px;border:1px solid rgba(23,33,49,.12);border-radius:14px;background:linear-gradient(180deg,#fff,#f8fafb)}
      .your-play-actionable-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px}.your-play-actionable-head small{font-size:10px;letter-spacing:.12em;font-weight:700;opacity:.65}.your-play-actionable-head h3{margin:5px 0 0;font-size:20px}.your-play-actionable-head>span{font-size:11px;font-weight:700;white-space:nowrap;padding:6px 9px;border:1px solid rgba(23,33,49,.12);border-radius:999px}
      .your-play-principle{margin:10px 0 16px;font-size:13px;opacity:.72}.your-play-insights{display:grid;gap:12px}.your-play-insights article{padding:14px;border-radius:11px;background:#fff;border:1px solid rgba(23,33,49,.09)}
      .insight-top{display:flex;align-items:center;gap:8px}.insight-top b{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:#172131;color:#fff;font-size:12px}.insight-top span{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em}.insight-top em{margin-left:auto;font-size:10px;font-style:normal;opacity:.62}.your-play-insights h4{margin:9px 0 12px;font-size:16px}.insight-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.insight-grid>div{padding:10px;border-radius:9px;background:#f4f6f8}.insight-grid small{font-size:9px;font-weight:800;letter-spacing:.1em;opacity:.62}.insight-grid p{margin:5px 0 0;font-size:12px;line-height:1.45}.insight-source{display:block;margin-top:10px;font-size:10px;opacity:.58}
      @media(max-width:700px){.insight-grid{grid-template-columns:1fr}.your-play-actionable-head h3{font-size:17px}}
    `}</style>
  </div>
}
