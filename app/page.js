'use client'

import { useState } from 'react'
import { countries, frameworkSections } from '../data/countries'

export default function Home() {
  const [countryName, setCountryName] = useState('India')
  const country = countries.find(c => c.name === countryName) || countries[0]

  return <main className="wrap">
    <section className="hero"><div className="hero-inner">
      <div className="eyebrow">The Cultural Playbook</div>
      <h1>PACE</h1>
      <p>Cultural Intelligence for international selling, negotiation and business.</p>
      <div className="tag hero-tag">Asia prototype · 49 markets</div>
    </div></section>

    <section className="content">
      <div className="panel intro">
        <div>
          <span className="tag">MARKET DE-CODE</span>
          <h2>Choose your market</h2>
          <p>Start with the four PACE lenses. Each section is designed to expand into a deeper commercial playbook.</p>
        </div>
        <select id="country" className="select" value={country.name} onChange={e => setCountryName(e.target.value)}>
          {countries.map(c => <option key={c.name}>{c.name}</option>)}
        </select>
      </div>

      <div className="panel">
        <div className="country-heading"><div><span className="tag">{country.sourceBacked ? 'PLAYBOOK SOURCE DATA' : 'FRAMEWORK READY'}</span><h2>{country.name}</h2></div><span className="country-count">Asia</span></div>
        <div className="grid">
          {frameworkSections.map(section => <article className="card" key={section.key}>
            <div className="letter">{section.letter}</div>
            <div className="stage">{section.stage}</div>
            <h3>{section.title}</h3>
            <p className="question">{section.question}</p>
            <p>{country[section.key]}</p>
            <span className="expand">Ready to expand →</span>
          </article>)}
        </div>
      </div>

      <div className="panel roadmap">
        <span className="tag">BUILDING THE PLAYBOOK</span>
        <h2>Four sections. One commercial view.</h2>
        <p>The framework maps PACE across the deal: Preparation & Trust at Discovery, Alignment of Power at Pitch & Proposal, Communication Patterns at Negotiation, and Execution & Risk at Closing.</p>
        <div className="roadmap-grid">{frameworkSections.map(s => <div key={s.key}><strong>{s.letter} · {s.title}</strong><span>{s.stage}</span></div>)}</div>
      </div>
    </section>
  </main>
}
