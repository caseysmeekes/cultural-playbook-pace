import { buildScenarioBrief, getCountryIntelligence, getSourceStatus } from './decisionEngine'

export const selfDimensions = [
  { id:'directness', label:'Directness', low:'I usually soften the message', high:'I usually say it directly' },
  { id:'formality', label:'Formality', low:'I quickly become informal', high:'I prefer formal interactions' },
  { id:'relationship', label:'Relationship orientation', low:'I focus on the task first', high:'I invest in relationship first' },
  { id:'hierarchy', label:'Hierarchy preference', low:'I prefer equal, open discussion', high:'I naturally defer to seniority' },
  { id:'decisionSpeed', label:'Decision speed', low:'I prefer to move quickly', high:'I prefer more time to align' },
  { id:'ambiguity', label:'Ambiguity tolerance', low:'I want clarity early', high:'I am comfortable with uncertainty' },
  { id:'meeting', label:'Meeting style', low:'I like concise, agenda-led meetings', high:'I like discussion and context' },
  { id:'communication', label:'Communication style', low:'I prioritise explicit wording', high:'I rely more on context and cues' },
  { id:'planning', label:'Planning preference', low:'I adapt as things develop', high:'I plan in detail before acting' }
]

const profileMap = {
  'Japan': { directness:3,formality:8,relationship:7,hierarchy:8,decisionSpeed:7,ambiguity:7,meeting:7,communication:8,planning:8 },
  'Germany': { directness:8,formality:7,relationship:4,hierarchy:5,decisionSpeed:5,ambiguity:3,meeting:3,communication:3,planning:9 },
  'France': { directness:6,formality:7,relationship:5,hierarchy:6,decisionSpeed:5,ambiguity:5,meeting:7,communication:6,planning:7 },
  'India': { directness:5,formality:6,relationship:8,hierarchy:7,decisionSpeed:5,ambiguity:7,meeting:7,communication:7,planning:6 },
  'Britain': { directness:6,formality:5,relationship:5,hierarchy:4,decisionSpeed:5,ambiguity:6,meeting:4,communication:6,planning:6 },
  'New Zealand': { directness:7,formality:3,relationship:5,hierarchy:3,decisionSpeed:7,ambiguity:6,meeting:3,communication:4,planning:5 },
  'United States': { directness:8,formality:4,relationship:4,hierarchy:3,decisionSpeed:8,ambiguity:4,meeting:3,communication:3,planning:7 },
  'Australia': { directness:7,formality:3,relationship:5,hierarchy:3,decisionSpeed:7,ambiguity:6,meeting:3,communication:4,planning:5 }
}

const derived = c => ({
  directness: c?.c?.toLowerCase().includes('direct') ? 7 : 5,
  formality: c?.a?.toLowerCase().includes('formal') || c?.meeting?.toLowerCase().includes('formal') ? 7 : 5,
  relationship: c?.p?.toLowerCase().includes('relationship') || c?.p?.toLowerCase().includes('trust') ? 7 : 5,
  hierarchy: c?.a?.toLowerCase().includes('hierarch') || c?.a?.toLowerCase().includes('senior') ? 7 : 5,
  decisionSpeed: c?.a?.toLowerCase().includes('consensus') || c?.e?.toLowerCase().includes('process') ? 4 : 6,
  ambiguity: c?.c?.toLowerCase().includes('context') || c?.c?.toLowerCase().includes('indirect') ? 7 : 5,
  meeting: c?.meeting?.toLowerCase().includes('discussion') || c?.c?.toLowerCase().includes('context') ? 7 : 5,
  communication: c?.c?.toLowerCase().includes('high-context') || c?.c?.toLowerCase().includes('indirect') ? 8 : 5,
  planning: c?.e?.toLowerCase().includes('process') || c?.e?.toLowerCase().includes('evidence') ? 7 : 5
})

export function getMarketStyle(country) {
  const intel = getCountryIntelligence(country)
  return profileMap[intel.country] || derived(country)
}

export function buildAdaptation({ self, country }) {
  const target = getMarketStyle(country)
  const rows = selfDimensions.map(d => ({ ...d, user:Number(self?.[d.id] || 5), target:target[d.id] || 5, gap:Math.abs(Number(self?.[d.id] || 5)-(target[d.id]||5)) }))
  const aligned = [...rows].sort((a,b)=>a.gap-b.gap).slice(0,3)
  const gaps = [...rows].sort((a,b)=>b.gap-a.gap)
  const biggest = gaps[0]
  const easiest = gaps[gaps.length-1]
  return {
    rows,
    aligned,
    biggest,
    easiest,
    risk:`Your ${biggest.label.toLowerCase()} preference may create friction if the counterpart expects a different rhythm. Test the expectation rather than assuming it.`,
    adaptation:`Experiment with ${biggest.target > biggest.user ? 'slowing down and adding more context' : 'being more explicit and action-oriented'} before changing your underlying style.`,
    remember:`You do not need to become ${country.name === 'Japan' ? 'Japanese' : country.name === 'Germany' ? 'German' : country.name}. Adapt the interaction, not your identity.`
  }
}

export function translateApproach({ text, country, activity='First meeting' }) {
  const intel = getCountryIntelligence(country)
  const lower=(text||'').toLowerCase()
  let friction = `Your normal approach may be interpreted differently in ${intel.country}, particularly around ${intel.communication.toLowerCase()}.`
  let adapted = `Consider making the intent explicit, checking how the counterpart prefers to proceed, and allowing the interaction to reflect the local relationship, authority and communication context.`
  if(lower.includes('straight')||lower.includes('proposal')||lower.includes('get into')) adapted=`Before moving straight into the commercial detail, consider establishing the context, confirming who needs to be involved and checking whether the counterpart is ready to move into the proposal.`
  if(lower.includes('yes')||lower.includes('agree')) adapted=`Treat the positive response as useful information, then clarify what has actually been agreed, who owns the next step and what internal approval remains.`
  if(lower.includes('price')||lower.includes('discount')) adapted=`Before negotiating price, clarify the underlying concern, decision criteria and approval path so the commercial discussion addresses the real constraint.`
  return { normal:text, friction, adapted, why:`PACE applies ${activity.toLowerCase()} through ${intel.country}'s relationship, authority, communication and execution context. ${intel.sourceBasis}` }
}

export function buildDealStalled({ what, country, activity='Deal has stalled' }) {
  const intel=getCountryIntelligence(country)
  const explanations={
    'No response':['Internal priorities or approval may have changed.','The contact may be unavailable, overloaded, or waiting on another stakeholder.'],
    'Proposal delayed':['The organisation may need more internal alignment.','Scope, budget, timing or competing priorities may have changed.'],
    'Decision postponed':['Consensus or formal approval may still be incomplete.','There may be a genuine business, budget or political constraint.'],
    'Suddenly requesting more detail':['The proposal may be entering a deeper evaluation stage.','A technical, procurement or risk question may have surfaced.'],
    'Senior stakeholder introduced':['The opportunity may be moving to a higher approval level.','The organisation may be changing ownership or decision structure.'],
    'Price objection':['The commercial value or budget may not be aligned.','Price may be a negotiating position rather than the root issue.'],
    'Verbal agreement but no action':['The verbal commitment may not yet equal formal approval.','The next step may lack an owner, deadline or internal priority.']
  }
  const [possible,other]=explanations[what]||['The situation may reflect the market context and communication pattern.','There may be a commercial, organisational or timing issue unrelated to culture.']
  return { possible:[possible,`In ${intel.country}, pay attention to ${intel.communication.toLowerCase()} and ${intel.decisionMaking.toLowerCase()}.`], other:[other,'Do not diagnose culture until you have tested the operational explanation.'], questions:['What has changed internally since our last discussion?','Who else needs to be comfortable with the next step?','Is there anything in the proposal that needs clarification or additional evidence?'], dont:`Do not assume the silence or delay is cultural. Culture gives you a hypothesis. The individual gives you the answer.`, next:'Re-open the conversation with a low-pressure diagnostic question, then agree one specific next step, owner and timing.' }
}

export function buildScenario({ country, industry, customerType, meetingPurpose, relationshipStage, dealStage, challenge }) {
  const brief=buildScenarioBrief({country,activity:meetingPurpose||'First meeting',industry,buyerType:customerType,relationshipStage})
  return { ...brief, dealStage, knownChallenge:challenge, scenario:`${meetingPurpose||'Meeting'} with a ${customerType||'customer'} at ${relationshipStage||'current'} relationship stage.` }
}

export function sourceMeta(country) {
  const intel=getCountryIntelligence(country)
  return { status:getSourceStatus(country), basis:intel.sourceBasis, why:`This recommendation exists because PACE combines the selected market profile with the specific sales situation. Where source material is limited, PACE uses the framework rather than presenting inference as fact.` }
}
