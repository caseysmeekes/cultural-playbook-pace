import { buildYourPlay } from '../data/decisionEngine'

export default function YourPlay({ country, activity, industry, buyerType = '', relationshipStage = '' }) {
  const play = buildYourPlay({ country, activity, industry, buyerType, relationshipStage })
  const items = [
    ['DO', play.do],
    ['DON’T', play.dont],
    ['ASK', play.ask],
    ['BRING', play.bring],
    ['WATCH', play.watch],
    ['NEXT', play.next]
  ]

  return <div className="your-play">
    <div className="your-play-grid">
      {items.map(([label, text]) => <article key={label}><span>{label}</span><p>{text}</p></article>)}
    </div>
    <div className="your-play-context"><b>{play.context}</b><span>{play.industryLens}</span></div>
  </div>
}
