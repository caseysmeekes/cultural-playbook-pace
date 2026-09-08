import { countries } from './countries'
import { sourceLevels, getCountryIntelligence } from './decisionEngine'

export const selfDimensions = [
  { key:'directness', label:'Directness', low:'More indirect / contextual', high:'Very direct / explicit' },
  { key:'formality', label:'Formality', low:'Relaxed / informal', high:'Formal / structured' },
  { key:'relationship', label:'Relationship orientation', low:'Task-first', high:'Relationship-first' },
  { key:'hierarchy', label:'Hierarchy preference', low:'Flat / egalitarian', high:'Hierarchy-aware' },
  { key:'decisionSpeed', label:'Decision speed', low:'Patient / deliberative', high:'Fast / decisive' },
  { key:'ambiguity', label:'Tolerance for ambiguity', low:'Prefer certainty', high:'Comfortable with ambiguity' },
  { key:'meeting', label:'Meeting style', low:'Agenda / task-led', high:'Discussion / relationship-led' },
  { key:'communication', label:'Communication style', low:'Explicit / literal', high:'Context / nuance-led' },
  { key:'planning', label:'Planning preference', low:'Flexible / adaptive', high:'Detailed / planned' }
]

const keywordSignals = {
  directness: { high:['direct','explicit','pragmatic','straight','clear'], low:['indirect','context','harmony','polite','subtle'] },
  formality: { high:['formal','senior','deference','protocol','status'], low:['informal','relaxed','egalitarian','casual'] },
  relationship: { high:['relationship','trust','rapport','personal','harmony'], low:['task','pragmatic','transaction','efficient'] },
  hierarchy: { high:['hierarchy','senior','authority','status','deference'], low:['flat','egalitarian','consensus'] },
  decisionSpeed: { high:['fast','quick','decisive','pragmatic','immediate'], low:['consensus','deliberate','process','review','patience'] },
  ambiguity: { high:['flexible','adaptive','context'], low:['certainty','precision','evidence','process','compliance'] },
  meeting: { high:['relationship','discussion','harmony','rapport','context'], low:['agenda','task','efficient','decision','pragmatic'] },
  communication: { high:['context','indirect','nuance','harmony','silence'], low:['direct','explicit','clear','literal','pragmatic'] },
  planning: { high:['planning','process','detail','precision','structured','compliance'], low:['flexible','adaptive','relationship'] }
}

function countryText(country){ return [country.p,country.a,country.c,country.e,country.relationship,country.hierarchy,country.communication,country.decisionMaking,country.negotiation,country.meeting].filter(Boolean).join(' ').toLowerCase() }

export function getMarketProfile(countryOrName){
  const country = typeof countryOrName === 'object' ? countryOrName : countries.find(c=>c.name===countryOrName) || countries[0]
  const intelligence = getCountryIntelligence(country)
  const text = countryText(country)
  const dimensions = {}
  selfDimensions.forEach(d=>{
    const sig=keywordSignals[d.key]; const hi=sig.high.filter(k=>text.includes(k)).length; const lo=sig.low.filter(k=>text.includes(k)).length
    dimensions[d.key] = hi===lo ? 3 : Math.max(1,Math.min(5,3+(hi-lo)))
  })
  return { country:country.name, region:intelligence.region, sourceStatus:intelligence.sourceConfidence, sourceBasis:intelligence.sourceBasis, dimensions, intelligence }
}

export function assessAdaptation(userProfile, countryOrName){
  const market=getMarketProfile(countryOrName)
  const rows=selfDimensions.map(d=>{
    const user=Number(userProfile[d.key]||3); const target=market.dimensions[d.key]; const gap=Math.abs(user-target)
    return { ...d, user, target, gap, alignment:gap<=1?'ALIGN':'ADAPT' }
  })
  const gaps=[...rows].sort((a,b)=>b.gap-a.gap)
  const biggest=gaps[0]
  const easiest=[...rows].sort((a,b)=>a.gap-b.gap)[0]
  const alignments=rows.filter(r=>r.gap<=1).map(r=>r.label)
  const adaptations=rows.filter(r=>r.gap>=2).map(r=>r.label)
  return {
    market, rows,
    whereAlign:alignments.length?alignments:['No strong alignment yet, which is useful to know before the meeting.'],
    whereAdapt:adaptations.length?adaptations:['Your profile is broadly close to the market guidance across these dimensions.'],
    biggestRisk:biggest,
    easiestAdaptation:easiest,
    remember:`For ${market.country}, pay particular attention to ${biggest.label.toLowerCase()}. Treat the market guidance as a starting hypothesis, then test it with the people and organisation in front of you.`
  }
}

export function translateApproach(text,countryOrName){
  const market=getMarketProfile(countryOrName); const lower=(text||'').toLowerCase()
  const friction=[]; const adaptations=[]
  if(/straight|immediately|right into|skip.*small talk|just.*proposal|quick decision/.test(lower)){
    if(market.dimensions.relationship>=4) friction.push('Moving directly to the task may under-invest in relationship or trust-building.')
    if(market.dimensions.communication>=4) friction.push('A highly explicit opening may leave too little room for context, nuance or reading the room.')
  }
  if(/no problem|yes|sure|fine|sounds good/.test(lower) && market.dimensions.communication>=4) friction.push('Positive language may not by itself establish firm commitment. Confirm the specific next step.')
  if(/deadline|must|need.*today|urgent/.test(lower) && market.dimensions.relationship>=4) friction.push('Pressure before alignment may create avoidable resistance or reduce room for internal consultation.')
  if(/send.*contract|sign|close|commit/.test(lower) && market.dimensions.hierarchy>=4) friction.push('The person in front of you may not be the only authority or stakeholder required for commitment.')
  if(!friction.length) friction.push('No obvious friction signal was detected from the wording alone. The situation, buyer and relationship stage still matter.')
  if(market.dimensions.relationship>=4) adaptations.push('Consider opening with context and relationship before moving to the commercial ask.')
  if(market.dimensions.hierarchy>=4) adaptations.push('Check who else needs to be involved or comfortable before treating enthusiasm as commitment.')
  if(market.dimensions.communication>=4) adaptations.push('Use a little more context and invite concerns rather than relying only on an explicit yes/no response.')
  if(market.dimensions.planning>=4) adaptations.push('Make evidence, process, ownership and next steps easy to see.')
  if(!adaptations.length) adaptations.push('Keep the message clear, but test the counterpart’s preferred pace and level of detail before changing your approach.')
  const adapted = text ? adaptations[0] : 'Enter something you would normally say or do.'
  return { market, normal:text||'', friction, adapted, why:`The adaptation is driven by the PACE guidance for ${market.country}, particularly its relationship, hierarchy, communication and process signals. It is guidance, not a rule about an individual.` }
}

export function riskRadar(countryOrName, activity='First meeting'){
  const m=getMarketProfile(countryOrName); const d=m.dimensions
  const score={ Relationship:d.relationship, Hierarchy:d.hierarchy, Communication:d.communication, Consensus:Math.max(1,6-d.decisionSpeed), 'Decision making':6-d.decisionSpeed, 'Face / disagreement':d.communication, Process:d.planning, Time:6-d.decisionSpeed }
  return { market:m, activity, scores:score }
}

export function sourceWhy(status,dimension){
  if(status===sourceLevels.deep) return `This recommendation is supported by deeper country-specific source material. It is most useful as a practical starting point for ${dimension.toLowerCase()}, not as a rule about every person.`
  if(status===sourceLevels.informed) return `This recommendation combines available country-informed material with the PACE framework. Use it to form a hypothesis, then validate the actual buyer and organisation.`
  return `This is framework guidance where deeper country-specific material is limited. Use it to identify questions and adaptation points, not to make assumptions about individuals.`
}

export const guardrail='Culture gives you a hypothesis. The individual gives you the answer.'
