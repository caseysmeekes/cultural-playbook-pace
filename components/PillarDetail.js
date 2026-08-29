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
    <style jsx>{`
      .pillar-detail{margin-top:16px;border:1px solid #dfe6ed;border-radius:10px;background:#f8fafc;overflow:hidden}
      .detail-intro{display:flex;justify-content:space-between;gap:20px;padding:20px 20px 15px;border-bottom:1px solid #e4e9ee}
      .detail-intro h3{margin:2px 0 4px;font-size:18px}.detail-intro p{margin:0;color:#657181;font-size:10px}
      .detail-country{text-align:right;align-self:center}.detail-country span{display:block;font-weight:800;font-size:12px}.detail-country small{display:block;color:#7b8795;font-size:9px;margin-top:4px}
      .iat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0}
      .iat-grid article{padding:19px;border-right:1px solid #e2e7ec;min-height:290px}.iat-grid article:last-child{border-right:0}
      .iat-number{display:block;font-size:9px;color:#98a3ae;font-weight:800;margin-bottom:5px}.iat-grid article>b{font-size:10px;letter-spacing:.08em;color:#284a67}.iat-grid h4{font-size:13px;margin:7px 0}.iat-grid p{font-size:10px;line-height:1.55;color:#596777}
      .country-note,.activity-note{padding:10px;border-radius:6px;background:#fff;border:1px solid #e6ebef}.country-note strong,.activity-note strong{color:#27384b}
      .iat-grid ul{padding-left:17px;margin:12px 0}.iat-grid li{font-size:10px;line-height:1.6;color:#566474;margin-bottom:3px}
      .field-example{padding:15px 19px;background:#fff;border-top:1px solid #e2e7ec}.field-example span{font-size:9px;font-weight:800;letter-spacing:.08em;color:#536274}.field-example p{margin:6px 0 0;font-size:10px;line-height:1.55;color:#4e5c6b}
      @media(max-width:900px){.iat-grid{grid-template-columns:1fr}.iat-grid article{border-right:0;border-bottom:1px solid #e2e7ec;min-height:auto}.iat-grid article:last-child{border-bottom:0}}
      @media(max-width:600px){.detail-intro{display:block}.detail-country{text-align:left;margin-top:10px}}
    `}</style>
  </div>
}
