'use client'

import { useMemo, useState } from 'react'
import { countries, frameworkSections } from '../data/countries'

const industries = ['Technology', 'Aviation', 'Government', 'Professional Services', 'Food & Beverage', 'Manufacturing', 'Tourism', 'Other']
const activities = ['First meeting', 'Relationship building', 'Pitch / proposal', 'Negotiation', 'Closing a deal', 'New market entry', 'Deal has stalled']

function frictionScore(country, activity, homeMarket) {
  const base = country.sourceBacked ? 62 : 50
  const activityAdjustment = activity === 'Negotiation' ? 8 : activity === 'Closing a deal' ? 6 : activity === 'First meeting' ? 3 : 0
  const homeAdjustment = homeMarket === 'New Zealand' ? 4 : 0
  return Math.min(95, base + activityAdjustment + homeAdjustment)
}

export default function Home() {
  const [countryName, setCountryName] = useState('India')
  const [homeMarket, setHomeMarket] = useState('New Zealand')
  const [activity, setActivity] = useState('First meeting')
  const [industry, setIndustry] = useState('Technology')
  const [activeSection, setActiveSection] = useState(null)
  const country = countries.find(c => c.name === countryName) || countries[0]
  const score = frictionScore(country, activity, homeMarket)

  const meetingBrief = useMemo(() => ({
    opening: country.p,
    power: country.a,
    communication: country.c,
    close: country.e,
    industry: `For ${industry.toLowerCase()}, use this as an industry lens rather than a country stereotype. Validate the customer's organisation, regulatory environment and buying process before adapting your pitch.`,
    warning: score >= 65 ? 'Take a Moment of Pause before pushing for a decision. Your biggest risk is assuming your home-market sales rhythm will transfer unchanged.' : 'Keep your approach flexible and validate the local buying context before making assumptions.'
  }), [country, industry, score])

  return <main className="wrap">
    <section className="hero"><div className="hero-inner">
      <div className="eyebrow">The Cultural Playbook</div><h1>PACE</h1>
      <p>Cultural Intelligence for international selling, negotiation and business.</p><div className="tag hero-tag">Asia prototype · 49 markets</div>
    </div></section>

    <section className="content">
      <div className="panel setup">
        <div className="setup-head"><div><span className="tag">01 · SET THE CONTEXT</span><h2>What are you preparing for?</h2></div><span className="score-mini">Friction {score}/100</span></div>
        <div className="controls">
          <label>Home market<select className="select" value={homeMarket} onChange={e => setHomeMarket(e.target.value)}><option>New Zealand</option><option>Australia</option><option>United Kingdom</option><option>United States</option><option>Other</option></select></label>
          <label>Target market<select className="select" value={country.name} onChange={e => setCountryName(e.target.value)}>{countries.map(c => <option key={c.name}>{c.name}</option>)}</select></label>
          <label>Activity<select className="select" value={activity} onChange={e => setActivity(e.target.value)}>{activities.map(a => <option key={a}>{a}</option>)}</select></label>
          <label>Industry<select className="select" value={industry} onChange={e => setIndustry(e.target.value)}>{industries.map(i => <option key={i}>{i}</option>)}</select></label>
        </div>
      </div>

      <div className="panel pause"><div><span className="tag">02 · MOMENT OF PAUSE</span><h2>Before you act, check the friction.</h2><p>PACE shifts the question from “How do I sell?” to “How do they buy?”</p></div><button className="pause-button" onClick={() => setActiveSection('pause')}>TAKE THE PAUSE</button></div>

      <div className="panel">
        <div className="country-heading"><div><span className="tag">{country.sourceBacked ? 'PLAYBOOK SOURCE DATA' : 'FRAMEWORK READY'}</span><h2>{country.name}</h2></div><span className="country-count">Asia</span></div>
        <div className="grid">{frameworkSections.map(section => <article className={`card ${activeSection === section.key ? 'selected' : ''}`} key={section.key} onClick={() => setActiveSection(activeSection === section.key ? null : section.key)}>
          <div className="letter">{section.letter}</div><div className="stage">{section.stage}</div><h3>{section.title}</h3><p className="question">{section.question}</p><p>{country[section.key]}</p><span className="expand">{activeSection === section.key ? 'Selected ✓' : 'Open play →'}</span>
        </article>)}</div>
      </div>

      <div className="two-col">
        <div className="panel"><span className="tag">03 · CULTURAL FRICTION</span><h2>{score}<span className="score-denom">/100</span></h2><p>Prototype friction indicator for {homeMarket} → {country.name} during <strong>{activity.toLowerCase()}</strong>. It is a planning signal, not a scientific country score.</p>
          <div className="friction-list"><div><span>Trust & relationship</span><b>High</b></div><div><span>Hierarchy & authority</span><b>Check</b></div><div><span>Communication context</span><b>Check</b></div><div><span>Execution & risk</span><b>Check</b></div></div>
        </div>
        <div className="panel"><span className="tag">04 · CULTURAL TAX</span><h2>Where could friction cost you?</h2><p>Use PACE to look for hidden costs before they become commercial problems.</p><div className="tax-grid"><span>Lost time</span><span>Slower decisions</span><span>Damaged trust</span><span>Misread signals</span><span>Lost margin</span><span>Market-entry risk</span></div></div>
      </div>

      <div className="panel brief"><div className="setup-head"><div><span className="tag">05 · MEETING PREPARATION</span><h2>Your {activity.toLowerCase()} brief</h2></div><span className="tag">{industry}</span></div>
        <div className="brief-grid"><div><strong>OPEN</strong><p>{meetingBrief.opening}</p></div><div><strong>MAP POWER</strong><p>{meetingBrief.power}</p></div><div><strong>COMMUNICATE</strong><p>{meetingBrief.communication}</p></div><div><strong>EXECUTE</strong><p>{meetingBrief.close}</p></div><div><strong>INDUSTRY LENS</strong><p>{meetingBrief.industry}</p></div><div><strong>BIGGEST WATCH-OUT</strong><p>{meetingBrief.warning}</p></div></div>
      </div>

      <div className="panel compare"><span className="tag">06 · COUNTRY COMPARISON</span><h2>Compare markets</h2><p>Three adjacent markets are shown as a first prototype. We can make this a proper multi-select next.</p>
        <div className="compare-grid">{[country.name, countries[(countries.findIndex(c => c.name === country.name) + 1) % countries.length].name, countries[(countries.findIndex(c => c.name === country.name) + 2) % countries.length].name].map(name => { const c = countries.find(x => x.name === name); return <div className="compare-card" key={name}><h3>{name}</h3>{frameworkSections.map(s => <div key={s.key}><b>{s.letter}</b><span>{c[s.key]}</span></div>)}</div> })}</div>
      </div>

      <div className="panel pause-detail"><span className="tag">07 · MOMENT OF PAUSE CHECKLIST</span><h2>Before you send, pitch or close</h2><div className="check-grid"><div>Who actually has authority?</div><div>How direct should I be?</div><div>Has enough trust been established?</div><div>Could this create loss of face?</div><div>What does “yes” actually mean here?</div><div>What evidence reduces perceived risk?</div></div></div>

      {activeSection === 'pause' && <div className="modal-backdrop" onClick={() => setActiveSection(null)}><div className="modal" onClick={e => e.stopPropagation()}><span className="tag">MOMENT OF PAUSE</span><h2>Pause before you push.</h2><p><strong>Market:</strong> {country.name} · <strong>Activity:</strong> {activity}</p><ol><li>Check who really holds authority.</li><li>Check whether your communication style matches the context.</li><li>Check whether trust is sufficient for the next ask.</li><li>Check how face, silence and indirect signals could affect the interaction.</li><li>Define the real next step rather than assuming agreement.</li></ol><button className="close" onClick={() => setActiveSection(null)}>Continue →</button></div></div>}

      <div className="panel source-note"><span className="tag">SOURCE DISCIPLINE</span><p>Profiles marked <strong>Playbook Source Data</strong> use material currently available in The Cultural Playbook project. Profiles marked <strong>Framework Ready</strong> have the PACE structure but need additional source development before detailed country claims are added.</p></div>
    </section>
  </main>
}
