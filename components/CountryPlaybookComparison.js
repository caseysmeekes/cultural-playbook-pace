'use client'

import { useMemo, useState } from 'react'
import { countries } from '../data/countries'
import { buildCountryComparison, comparisonScenarios } from '../data/countryScenarios'

const grid={display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}
const select={display:'block',width:'100%',padding:10,marginTop:6,border:'1px solid #d5dee6',borderRadius:7,background:'#fff'}
const panel={background:'#fff',border:'1px solid #e0e7ec',borderRadius:10,padding:20,margin:'15px 0'}
const card={border:'1px solid #e3e8ec',borderRadius:8,padding:15,margin:'10px 0'}

export default function CountryPlaybookComparison(){
 const [a,setA]=useState('Japan'),[b,setB]=useState('Germany'),[scenario,setScenario]=useState('')
 const data=useMemo(()=>buildCountryComparison({countryA:a,countryB:b,scenario}),[a,b,scenario])
 return <main style={{minHeight:'100vh',background:'#f3f6f8',color:'#172131',fontFamily:'Arial,sans-serif',padding:24}}><div style={{maxWidth:1400,margin:'auto'}}>
  <p><a href="/country-playbook">← Country Playbook</a></p><h1>Country Playbook Comparison</h1><p>How should I change my approach?</p>
  <section style={panel}><div style={{...grid,gridTemplateColumns:'1fr 40px 1fr 1fr'}}><Country label="COUNTRY A" value={a} set={setA}/><strong>VS</strong><Country label="COUNTRY B" value={b} set={setB}/><label>SCENARIO<select style={select} value={scenario} onChange={e=>setScenario(e.target.value)}><option value="">All situations</option>{comparisonScenarios.map(s=><option key={s}>{s}</option>)}</select></label></div></section>
  <div style={grid}><Box title="WHAT IS SIMILAR?" text={data.whatIsSimilar}/><Box title="WHAT IS DIFFERENT?" text={data.whatIsDifferent}/><Box title="WHERE SHOULD I ADAPT?" text={data.whereAdapt}/></div>
  <section style={panel}><h2>{scenario||'Country approach'} · {a} vs {b}</h2>{data.rows.map(r=><article key={r.dimension} style={card}><h3>{r.dimension}</h3><div style={grid}><Box title={a} text={r.countryA.text}/><Box title={b} text={r.countryB.text}/><Box title="YOUR ADAPTATION" text={r.adaptation}/></div><small>{r.status} · {r.confidence}{r.countryA.evidenceIds.length?` · ${r.countryA.evidenceIds.join(', ')}`:''}{r.countryB.evidenceIds.length?` · ${r.countryB.evidenceIds.join(', ')}`:''}</small></article>)}</section>
  <section style={panel}><h2>Practical adaptation</h2><div style={grid}>{Object.entries({'DO':data.practical.do,"DON'T":data.practical.dont,ASK:data.practical.ask,BRING:data.practical.bring,WATCH:data.practical.watch,NEXT:data.practical.next}).map(([k,v])=><Box key={k} title={k} text={v}/>)}</div></section>
  <p style={{padding:14,background:'#fff8e7',border:'1px solid #eedcae'}}>Culture gives you a hypothesis. The individual gives you the answer.</p>
 </div></main>
}
function Country({label,value,set}){return <label>{label}<select style={select} value={value} onChange={e=>set(e.target.value)}>{countries.map(c=><option key={c.name}>{c.name}</option>)}</select></label>}
function Box({title,text}){return <div style={{padding:14,background:'#f7f9fa',borderRadius:7}}><b style={{fontSize:11}}>{title}</b><p style={{fontSize:13,lineHeight:1.5}}>{text}</p></div>}
