'use client'

import { useMemo, useState } from 'react'
import { buildSourceToPACE } from '../../../data/sourceToPaceEngine'

const markets = ['Japan', 'Germany', 'India', 'France', 'United Kingdom', 'United States', 'New Zealand']
const scenarios = ['First meeting', 'Relationship building', 'Pitch / proposal', 'Negotiation', 'Closing a deal', 'New market entry', 'Partnership', 'Deal has stalled', 'Tender / RFP', 'Government engagement']

function similarity(a, b) {
  const left = a.sourceIds || []
  const right = b.sourceIds || []
  const shared = left.filter(id => right.includes(id)).length
  const union = new Set([...left, ...right]).size || 1
  return shared / union
}

export default function ApplicationAudit() {
  const [scenario, setScenario] = useState('First meeting')
  const [industry, setIndustry] = useState('Aviation')
  const [customerType, setCustomerType] = useState('Government agency')
  const results = useMemo(() => markets.map(country => buildSourceToPACE({ country, scenario, industry, customerType, relationshipStage: 'New contact', dealStage: 'Discovery', decisionEnvironment: 'Consensus / committee' })), [scenario, industry, customerType])
  const evidenceCount = results.reduce((n, r) => n + r.sourceIds.length, 0)
  const countrySpecific = results.filter(r => r.pillars.some(p => p.informationClass === 'COUNTRY-SPECIFIC')).length
  const pairSimilarity = []
  for (let i = 0; i < results.length; i++) for (let j = i + 1; j < results.length; j++) pairSimilarity.push(similarity(results[i], results[j]))
  const genericDominance = results.every(r => r.pillars.filter(p => p.informationClass === 'COUNTRY-SPECIFIC').length === 0)
  const status = genericDominance ? 'REVIEW' : 'PASS'

  return <main style={{ minHeight: '100vh', background: '#f4f6f8', color: '#172131', fontFamily: 'Inter,system-ui,sans-serif', padding: 24 }}>
    <div style={{ maxWidth: 1100, margin: 'auto' }}>
      <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.1em' }}>PACE 2C1 · APPLICATION AUDIT</p>
      <h1>Source → PACE regression</h1>
      <p>Same scenario, different markets. Evidence can only change the output where the validated source layer supports a difference.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, margin: '20px 0' }}>
        <label>Scenario<select value={scenario} onChange={e => setScenario(e.target.value)} style={{ width: '100%', padding: 9 }}>{scenarios.map(x => <option key={x}>{x}</option>)}</select></label>
        <label>Industry<select value={industry} onChange={e => setIndustry(e.target.value)} style={{ width: '100%', padding: 9 }}><option>Aviation</option><option>Technology</option><option>Government</option><option>Professional Services</option><option>Manufacturing</option><option>Other</option></select></label>
        <label>Customer<select value={customerType} onChange={e => setCustomerType(e.target.value)} style={{ width: '100%', padding: 9 }}><option>Government agency</option><option>Enterprise</option><option>Procurement team</option><option>Technical team</option><option>Executive sponsor</option></select></label>
      </div>
      <section style={{ background: '#fff', border: '1px solid #dce5ec', borderRadius: 10, padding: 18, marginBottom: 14 }}>
        <b>QUALITY GATE: {status}</b><p>{countrySpecific}/{markets.length} markets have at least one verified country-specific pillar for this scenario. {evidenceCount} verified evidence links are active across the regression set.</p>
      </section>
      <div style={{ display: 'grid', gap: 12 }}>{results.map(result => <article key={result.country} style={{ background: '#fff', border: '1px solid #dce5ec', borderRadius: 10, padding: 18 }}>
        <h2 style={{ marginTop: 0 }}>{result.country}</h2>
        {result.pillars.map(p => <div key={p.pillar} style={{ borderTop: '1px solid #edf1f4', padding: '12px 0' }}><b>{p.pillar} · {p.name}</b><div style={{ fontSize: 12, lineHeight: 1.5, marginTop: 5 }}><b>UNDERSTAND:</b> {p.understand}</div><div style={{ fontSize: 12, lineHeight: 1.5 }}><b>APPLY:</b> {p.apply}</div><div style={{ fontSize: 12, lineHeight: 1.5 }}><b>ACT:</b> {p.act}</div><small>{p.confidence} · {p.sourceIds.length ? p.sourceIds.join(', ') : 'No verified country-specific evidence'}</small></div>)}
      </article>)}</div>
      <section style={{ background: '#eef5fa', borderRadius: 10, padding: 18, marginTop: 14 }}><b>GUARDRAIL</b><p>Culture gives you a hypothesis. The individual gives you the answer.</p><p>Source evidence supplies the cultural consideration. Scenario, industry, customer and deal context change the commercial application, not the underlying country evidence.</p></section>
    </div>
  </main>
}
