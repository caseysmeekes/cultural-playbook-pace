'use client'

import { useState } from 'react'

const countries = [
  { name: 'New Zealand', p: 'Low hierarchy, direct but friendly communication, practical decision making.', a: 'Build trust through authenticity and evidence.', c: 'Clear, informal and conversational.', e: 'Be prepared, pragmatic and avoid unnecessary ceremony.' },
  { name: 'India', p: 'Hierarchy and relationships can strongly influence business interactions.', a: 'Understand who has influence and who gives final approval.', c: 'Respectful, contextual and relationship-aware.', e: 'Allow time for relationship building and layered decisions.' },
  { name: 'Indonesia', p: 'Relationships, harmony and status are important in many business settings.', a: 'Identify senior stakeholders and show appropriate respect.', c: 'Polite, indirect and harmony-conscious.', e: 'Be patient, flexible and avoid public confrontation.' },
  { name: 'Malaysia', p: 'Relationship-led business culture with meaningful attention to hierarchy and harmony.', a: 'Map formal authority alongside informal influence.', c: 'Polite, measured and context-sensitive.', e: 'Prioritise trust, patience and respectful engagement.' },
  { name: 'Singapore', p: 'Professional, structured and relatively low-context compared with many regional neighbours.', a: 'Demonstrate competence, preparation and commercial credibility.', c: 'Clear, professional and measured.', e: 'Be punctual, prepared and specific.' }
]

export default function Home() {
  const [country, setCountry] = useState(countries[0])
  return <main className="wrap">
    <section className="hero"><div className="hero-inner">
      <div className="eyebrow">The Cultural Playbook</div>
      <h1>PACE</h1>
      <p>A practical Cultural Intelligence tool for preparing to sell, negotiate and work across cultures.</p>
    </div></section>
    <section className="content">
      <div className="panel">
        <label className="label" htmlFor="country">Select a country</label>
        <select id="country" className="select" value={country.name} onChange={e => setCountry(countries.find(c => c.name === e.target.value))}>
          {countries.map(c => <option key={c.name}>{c.name}</option>)}
        </select>
      </div>
      <div className="panel">
        <span className="tag">PACE PROFILE</span>
        <h2>{country.name}</h2>
        <div className="grid">
          <div className="card"><h3>P · Power</h3><p>{country.p}</p></div>
          <div className="card"><h3>A · Authority</h3><p>{country.a}</p></div>
          <div className="card"><h3>C · Communication</h3><p>{country.c}</p></div>
          <div className="card"><h3>E · Expectations</h3><p>{country.e}</p></div>
        </div>
      </div>
    </section>
  </main>
}