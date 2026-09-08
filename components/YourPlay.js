import { buildYourPlay } from '../data/decisionEngine'

export default function YourPlay({ country, activity, industry, buyerType = '', relationshipStage = '', dealStage = '', decisionEnvironment = '', knownChallenge = '', communicationProfile = '' }) {
  const play = buildYourPlay({ country, activity, industry, buyerType, relationshipStage, dealStage, decisionEnvironment, knownChallenge, communicationProfile })
  const items = [['DO', play.do], ['DON’T', play.dont], ['ASK', play.ask], ['BRING', play.bring], ['WATCH', play.watch], ['NEXT', play.next]]

  return <div className="your-play">
    <div className="your-play-grid">
      {items.map(([label, text]) => <article key={label}><span>{label}</span><p>{text}</p></article>)}
    </div>
    <div className="your-play-context"><b>{play.context}</b><span>{play.industryLens}</span></div>
    <div className="your-play-source"><b>{play.sourceConfidence}</b><span>{play.sourceEvidenceIds?.length ? `${play.sourceEvidenceIds.length} verified source record${play.sourceEvidenceIds.length === 1 ? '' : 's'} applied.` : 'No verified country-specific evidence for this scenario; framework guidance is shown.'}</span></div>
    {play.sourceTrace?.map((trace, i) => <small key={i}>{trace}</small>)}
  </div>
}
