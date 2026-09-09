'use client'

import { useMemo, useState } from 'react'
import { countries } from '../data/countries'
import { buildCountryComparison, comparisonScenarios } from '../data/countryScenarios'

export default function CountryPlaybookComparison() {
  const [a, setA] = useState('Japan')
  const [b, setB] = useState('Germany')
  const [scenario, setScenario] = useState('')
  const data = useMemo(() => buildCountryComparison({ countryA: a, countryB: b, scenario }), [a, b, scenario])
  return <main style={{padding:24,fontFamily:'Arial',maxWidth:1400,margin:'auto'}}>
    <p><a href="/country-playbook">← Country Playbook</a></p>
    <h1>Country Playbook Comparison</h1>
    <p>How should I change my approach?</p>
    <div style={{display:'grid',gridTemplateColumns:'1fr 40px 1fr 1fr',gap:12,margin:'24px 0'}}>
      <Select label="COUNTRY A" value={a} setValue={setA}/><strong>VS</strong><Select label="COUNTRY B" value={b} setValue={setB}/>
      <label>SCENARIO<select style={selectStyle} value={scenario} onChange={e=>setScenario(e.target.value)}><option value="">All situations</option>{comparisonScenarios.map(s=><option key={s}>{s}</option>)}</select></label>
    </div>
    <div style={grid3}><Box title="WHAT IS SIMILAR?" text={data.whatIsSimilar}/><Box title="WHAT IS DIFFERENT?" text={data.whatIsDifferent}/><Box title="WHERE SHOULD I ADAPT?" text={data.whereAdapt}/></div>
    <h2 style={{marginTop:30}}>Comparison matrix</h2>
    {data.rows.map(row=><section key={row.dimension} style={card}>
      <h3>{row.dimension}</h3><div style={grid3}><Box title={a} text={row.countryA.text}/><Box title={b} text={row.countryB.text}/><Box title="YOUR ADAPTATION" text={row.adaptation}/></div>
      <small>{row.status} · {row.confidence}{row.countryA.evidenceIds.length ? ` · ${row.countryA.evidenceIds.join(', ')}` : ''}{row.countryB.evidenceIds.length ? ` · ${row.countryB.evidenceIds.join(', ')}` : ''}</small>
    </section>)}
    <div style={{...card,marginTop:20}}><b>PRACTICAL ADAPTATION</b><div style={grid3}>{Object.entries({'DO':data.practical.do,"DON'T":data.practical.dont,ASK:data.practical.ask,BRING:data.practical.bring,WATCH:data.practical.watch,NEXT:data.practical.next}).map(([k,v])=><Box key={k} title={k} text={v}/>)}</div></div>
    <p style={{marginTop:24,padding:14,background:'#fff8e7'}}>Culture gives you a hypothesis. The individual gives you the answer.</p>
  </main>
}

function Select({label,value,setValue}) { return <label>{label}<select style={selectStyle} value={value} onChange={e=>setValue(e.target.value)}>{countries.map(c=><option key={c.name}>{c.name}</option>)}</select></label> }
function Box({title,text}) { return <div style={{padding:14,background:'#f7f9fa',borderRadius:7}}><b style={{fontSize:11}}>{title}</b><p style={{fontSize:13,lineHeight:1.5}}>{text}</p></div> }
const selectStyle={display:'block',width:'100%',padding:11,marginTop:6,border:'1px solid #d5dee6',borderRadius:7,background:'#fff'}
const grid3={display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}
const card={border:'1px solid #e0e7ec',borderRadius:10,padding:18,margin:'12px 0',background:'#fff'}
