import { pillarGuidance, getActivityApplication } from '../data/pillarGuidance'

export default function PillarDetail({ pillar, country, activity, industry }) {
  const guide = pillarGuidance[pillar]
  const section = {p:'Preparation & Trust',a:'Alignment of Power',c:'Communication Patterns',e:'Execution & Risk'}[pillar]
  const stage = {p:'Discovery',a:'Pitch & Proposal',c:'Negotiation',e:'Closing'}[pillar]
  const application = getActivityApplication(pillar, activity, industry)

  return <div className={`pillar-detail detail-${pillar}`}>
    <div className="detail-intro">
      <div><span className="tag">{pillar.toUpperCase()} · {stage.toUpperCase()}</span><h3>{section}</h3><p>{guide.question}</p></div>
      <div className="detail-country"><span>{country.name}</span><small>{activity} · {industry}</small></div>
    </div>
    <div className="iat-grid">
      <article><span className="iat-number">01</span><b>UNDERSTAND</b><h4>The cultural lens</h4><p>{guide.meaning}</p><p className="country-note"><strong>{country.name}:</strong> {country[pillar]}</p></article>
      <article><span className="iat-number">02</span><b>APPLY</b><h4>Translate it to your situation</h4><p>{guide.apply}</p><p className="activity-note"><strong>For {activity.toLowerCase()}:</strong> {application}</p></article>
      <article><span className="iat-number">03</span><b>ACT</b><h4>Do something differently</h4><p>{guide.act}</p><ul>{guide.checks.map(x=><li key={x}>{x}</li>)}</ul></article>
    </div>
    <div className="field-example"><span>REAL-WORLD APPLICATION</span><p>{guide.example}</p></div>
  </div>
}
