import { verifiedSourceEvidence, SOURCE_CONFIDENCE } from './sourceIntelligence'
import { getCountryIntelligence } from './decisionEngine'

export const TOPIC_TAXONOMY = [
  { id:'trust', label:'Preparation & Trust', pillar:'P', topics:['First impressions','Relationship building','Credibility','Hospitality','Networking','Formality'] },
  { id:'power', label:'Alignment of Power', pillar:'A', topics:['Hierarchy','Seniority','Authority','Stakeholders','Decision-makers','Influencers','Consensus'] },
  { id:'communication', label:'Communication', pillar:'C', topics:['Directness','Indirectness','Silence','Listening','Questions','Disagreement','Agreement','Feedback','Written communication','Email','Presentations'] },
  { id:'meetings', label:'Meetings', pillar:'C', topics:['Preparation','Opening','Agenda','Participation','Discussion','Decision','Closing','Follow-up'] },
  { id:'negotiation', label:'Negotiation', pillar:'C', topics:['Preparation','Opening','Bargaining','Price','Concessions','Objections','Silence','Deadlock','Closing'] },
  { id:'decision-making', label:'Decision Making', pillar:'A', topics:['Individual decisions','Group decisions','Consensus','Evidence','Authority','Internal consultation','Timing'] },
  { id:'etiquette', label:'Business Etiquette', pillar:'P', topics:['Greetings','Names','Titles','Dress','Business cards','Gifts','Dining','Hospitality'] },
  { id:'execution', label:'Execution & Risk', pillar:'E', topics:['Time','Punctuality','Planning','Process','Contracts','Commitments','Follow-up','Risk'] },
  { id:'government', label:'Government', pillar:'A', topics:['Institutions','Formality','Authority','Procurement','Regulation','Stakeholders','Documentation'] }
]

export const TOPIC_ALIASES = {
  'First impressions':['introductions','introduction','first meeting','opening','greetings','formality','status','trust','credibility','relationship building','business etiquette'],
  'Relationship building':['relationships','relationship','trust','hospitality','networking','introductions','personal relationships','business relationships'],
  'Credibility':['expertise','evidence','reputation','status','technical competence','references','trust','authority'],
  'Hospitality':['relationship building','relationships','dining','social interaction','trust','networking'],
  'Networking':['relationships','introductions','contacts','hospitality','trust','stakeholders'],
  'Formality':['titles','hierarchy','greetings','business etiquette','meetings','status','communication'],
  'Hierarchy':['seniority','authority','status','decision makers','leadership','power'],
  'Seniority':['hierarchy','titles','authority','status','leadership'],
  'Authority':['hierarchy','seniority','decision makers','approval','leadership','power'],
  'Stakeholders':['decision makers','influencers','authority','internal consultation','consensus','relationships'],
  'Decision-makers':['decision making','authority','seniority','stakeholders','approval'],
  'Influencers':['stakeholders','decision makers','relationships','authority','consensus'],
  'Consensus':['group decisions','internal consultation','alignment','agreement','stakeholders','decision making'],
  'Directness':['explicit','direct communication','clarity','disagreement','feedback'],
  'Indirectness':['context','implicit','harmony','politeness','disagreement','communication'],
  'Silence':['pauses','listening','communication','meetings','negotiation','response'],
  'Listening':['communication','questions','silence','meetings','understanding'],
  'Questions':['communication','discovery','listening','meetings','clarification'],
  'Disagreement':['no','refusal','objections','feedback','conflict','communication'],
  'Agreement':['consensus','commitment','yes','alignment','decision making'],
  'Feedback':['disagreement','communication','criticism','performance','listening'],
  'Written communication':['email','documentation','proposals','evidence','communication'],
  'Email':['written communication','follow up','communication','formality'],
  'Presentations':['pitch','proposal','evidence','communication','meetings'],
  'Preparation':['first meeting','planning','agenda','evidence','stakeholders'],
  'Opening':['first meeting','greetings','introduction','formality','small talk'],
  'Agenda':['preparation','meetings','planning','structure','discussion'],
  'Participation':['meetings','seniority','hierarchy','discussion','stakeholders'],
  'Discussion':['communication','meetings','questions','disagreement','agreement'],
  'Decision':['decision making','authority','consensus','approval'],
  'Closing':['decision','agreement','commitment','follow up','negotiation'],
  'Follow-up':['email','commitments','next steps','documentation','communication'],
  'Bargaining':['negotiation','concessions','price','objections','deal'],
  'Price':['negotiation','value','bargaining','concessions'],
  'Concessions':['negotiation','bargaining','trade offs','price'],
  'Objections':['disagreement','negotiation','concerns','evidence','risk'],
  'Deadlock':['negotiation','disagreement','stall','objections','decision making'],
  'Individual decisions':['authority','decision makers','accountability'],
  'Group decisions':['consensus','stakeholders','internal consultation','alignment'],
  'Evidence':['proof','facts','technical competence','proposal','credibility'],
  'Internal consultation':['consensus','stakeholders','group decisions','approval'],
  'Timing':['pace','decision making','planning','punctuality','process'],
  'Greetings':['introductions','first meeting','titles','formality'],
  'Names':['titles','greetings','introductions','formality'],
  'Titles':['names','seniority','hierarchy','formality','authority'],
  'Dress':['business etiquette','formality','first meeting'],
  'Business cards':['introductions','names','formality','networking'],
  'Gifts':['hospitality','relationship building','business etiquette'],
  'Dining':['hospitality','relationships','networking','business etiquette'],
  'Time':['punctuality','schedules','pace','meetings'],
  'Punctuality':['time','meetings','schedules'],
  'Planning':['preparation','process','agenda','execution'],
  'Process':['planning','procedures','procurement','contracts','governance'],
  'Contracts':['process','commitments','legal','documentation','risk'],
  'Commitments':['contracts','follow up','agreement','closing','accountability'],
  'Risk':['process','evidence','contracts','governance','execution'],
  'Institutions':['government','authority','regulation','stakeholders'],
  'Procurement':['tender','RFP','process','compliance','evaluation'],
  'Regulation':['government','institutions','compliance','process'],
  'Documentation':['evidence','compliance','procurement','contracts','governance']
}

const TOPIC_DESCRIPTIONS = {
  'First impressions':'The early signals that shape initial expectations about credibility, formality, trust and how the relationship may develop.',
  'Relationship building':'How trust and working relationships may be established, maintained and tested in a business context.',
  'Credibility':'The signals, evidence and expertise that may establish confidence in a counterpart.',
  'Formality':'How professional distance, titles, status and interaction norms may shape an early business relationship.',
  'Hierarchy':'How seniority and authority may affect participation, access and decision-making.',
  'Consensus':'How agreement may be developed across a group rather than assumed from one individual response.',
  'Directness':'How explicitly a counterpart may communicate a position, request or disagreement.',
  'Indirectness':'How meaning may be carried through context, relationship, implication or diplomatic language.',
  'Silence':'How pauses and lack of immediate response can be interpreted and tested.',
  'Disagreement':'How objections, refusal and alternative views may be expressed and handled.',
  'Preparation':'The work to complete before an interaction so the purpose, stakeholders, evidence and risks are clear.',
  'Negotiation':'How interests, authority, communication, concessions, pace and trust may shape the path to agreement.',
  'Decision Making':'How authority, evidence, consultation and timing can shape a business decision.',
  'Business Etiquette':'Practical conventions around greetings, names, titles, dress, cards, gifts and business hospitality.',
  'Time':'How expectations around schedules, pace and timing may affect execution.',
  'Punctuality':'How meeting and appointment timing may be interpreted by the counterpart.',
  'Process':'The formal and informal steps that may need to be understood before an outcome can be completed.',
  'Risk':'The points where uncertainty, missing evidence, approvals or process can block progress.',
  'Government':'How institutional roles, authority, regulation, documentation and accountability may shape engagement.'
}

const normalise = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()
const PILLAR_NAMES = { P:'Preparation & Trust', A:'Alignment of Power', C:'Communication Patterns', E:'Execution & Risk' }
function sectionFor(topic){ return TOPIC_TAXONOMY.find(section=>section.topics.includes(topic)) }
function topicPillar(topic){ const section=sectionFor(topic); return section?.pillar || 'C' }
function aliasesFor(topic){ return [topic,...(TOPIC_ALIASES[topic]||[])].map(normalise).filter(Boolean) }

function evidenceFor(country,topic){
 const aliases=aliasesFor(topic)
 return verifiedSourceEvidence.filter(record=>{
   if(record.country!==country) return false
   const fields=[record.topic,record.sourceEvidence,record.interpretation].map(normalise)
   return aliases.some(alias=>fields.some(field=>field.includes(alias)))
 })
}

function fallbackIntelligence(country,topic){
 const i=getCountryIntelligence(country),p=topicPillar(topic)
 return p==='P'?i.preparationTrust:p==='A'?i.alignmentPower:p==='C'?i.communicationPatterns:i.executionRisk
}

function exampleFor(topic){
 const examples={
  'Silence':'After asking a question, allow space for the response. If silence follows, test what it means rather than filling the gap with your own assumption.',
  'Consensus':'If several stakeholders are involved, provide material they can review internally and ask what still needs alignment before a decision.',
  'Preparation':'Before the meeting, identify the outcomes you need, the evidence required and the people likely to shape the discussion.',
  'Follow-up':'After the interaction, confirm the agreed next step, owner and timing in the format the counterpart expects.',
  'Punctuality':'Treat the meeting start time as part of your preparation, while validating how the specific organisation manages schedules.',
  'Disagreement':'Ask a neutral follow-up question when you are unsure whether an objection is final, exploratory or simply a request for more information.'
 }
 return examples[topic]||`Before acting on ${topic.toLowerCase()}, ask how the specific organisation normally approaches it and compare that answer with the available country evidence.`
}

const relatedMap={
 'First impressions':['Greetings','Formality','Credibility','Relationship building'],
 'Relationship building':['Trust','Hospitality','Networking','Credibility'],
 'Credibility':['Evidence','Authority','Presentations','First impressions'],
 'Formality':['Titles','Greetings','Hierarchy','Business cards'],
 'Hierarchy':['Seniority','Authority','Decision-makers','Consensus'],
 'Consensus':['Group decisions','Internal consultation','Stakeholders','Decision'],
 'Directness':['Indirectness','Disagreement','Feedback','Questions'],
 'Indirectness':['Directness','Silence','Listening','Disagreement'],
 'Silence':['Listening','Disagreement','Negotiation','Meetings'],
 'Disagreement':['Agreement','Feedback','Objections','Negotiation'],
 'Preparation':['Agenda','Opening','Stakeholders','Evidence'],
 'Negotiation':['Bargaining','Concessions','Objections','Closing'],
 'Decision Making':['Authority','Consensus','Evidence','Internal consultation'],
 'Business cards':['Greetings','Names','Formality','Networking'],
 'Punctuality':['Time','Preparation','Meetings','Follow-up'],
 'Process':['Planning','Contracts','Commitments','Risk'],
 'Government':['Institutions','Authority','Procurement','Regulation']
}

function relatedTopics(topic){ return (relatedMap[topic]||[]).filter(item=>TOPIC_TAXONOMY.some(section=>section.topics.includes(item))) }

function sourceInformedContext(country,topic){
 const context=fallbackIntelligence(country,topic)
 return typeof context==='string' ? context : ''
}

export function buildCountryTopic({country,topic}={}){
 const pillar=topicPillar(topic),pillarName=PILLAR_NAMES[pillar],intelligence=getCountryIntelligence(country),evidence=evidenceFor(country,topic)
 const context=sourceInformedContext(country,topic)
 if(evidence.length){
  const deep=evidence.some(e=>e.confidence===SOURCE_CONFIDENCE.DEEP_SOURCE)
  return {
   country,topic,pillar,pillarName,confidence:deep?SOURCE_CONFIDENCE.DEEP_SOURCE:SOURCE_CONFIDENCE.SOURCE_INFORMED,informationClass:'COUNTRY-SPECIFIC',
   description:TOPIC_DESCRIPTIONS[topic]||`A practical guide to ${topic.toLowerCase()} in business.`,
   explanation:evidence.slice(0,3).map(e=>e.sourceEvidence).join(' '),sources:evidence,
   businessImplication:evidence.slice(0,3).map(e=>e.interpretation).filter(Boolean).join(' ')||'Use the source-backed observation as a working hypothesis and test it with the counterpart.',
   example:exampleFor(topic),watchFor:`Watch for signals around ${topic.toLowerCase()} and test your interpretation rather than treating one interaction as proof.`,
   testHypothesis:`What would confirm or challenge my reading of ${topic.toLowerCase()} in this organisation?`,
   do:'Use the evidence as a hypothesis, then adapt to the person, organisation and situation.',
   avoid:'Do not turn a source observation into a deterministic rule about the individual.',
   related:relatedTopics(topic),pillarContext:pillar==='P'?intelligence.preparationTrust:pillar==='A'?intelligence.alignmentPower:pillar==='C'?intelligence.communicationPatterns:intelligence.executionRisk,
   coverage:'Verified country-specific evidence is available for this topic.',guardrail:'Culture gives you a hypothesis. The individual gives you the answer.'
  }
 }
 const hasContext=Boolean(context&&String(context).trim())
 return {
  country,topic,pillar,pillarName,confidence:hasContext?SOURCE_CONFIDENCE.SOURCE_INFORMED:SOURCE_CONFIDENCE.FRAMEWORK_READY,
  informationClass:hasContext?'SOURCE-INFORMED':'SOURCE GAP',description:TOPIC_DESCRIPTIONS[topic]||`A practical guide to ${topic.toLowerCase()} in business.`,
  explanation:hasContext?'The loaded country intelligence provides source-informed context for this pillar, but no verified country-specific evidence is currently linked directly to this topic.':'No verified country-specific evidence currently supports this topic.',
  sources:[],businessImplication:hasContext?'Use the country intelligence as context, not as a verified fact about this individual topic.':'Use the topic as a preparation framework, not as a country fact.',
  example:exampleFor(topic),watchFor:'Look for signals that help you understand the individual organisation rather than confirming a cultural stereotype.',
  testHypothesis:`What would confirm or challenge my initial assumption about ${topic.toLowerCase()} here?`,do:'Use the topic to prepare questions and validate the actual business context.',
  avoid:'Do not assume a country-level pattern applies to every person or organisation.',related:relatedTopics(topic),pillarContext:context,coverage:hasContext?'Source-informed country context is available, but verified topic-level evidence is not currently loaded.':'No verified country-specific evidence currently supports this topic.',guardrail:'Culture gives you a hypothesis. The individual gives you the answer.'
 }
}

export function searchCountryTopics(query=''){
 const q=normalise(query)
 return TOPIC_TAXONOMY.flatMap(section=>section.topics.filter(topic=>{
   const terms=[topic,section.label,...(TOPIC_ALIASES[topic]||[])].map(normalise)
   return !q||terms.some(term=>term.includes(q))
 }).map(topic=>({topic,section:section.label,pillar:section.pillar||null})))
}

export function getTopicAliases(topic){ return TOPIC_ALIASES[topic]||[] }
export function getTopicDescription(topic){ return TOPIC_DESCRIPTIONS[topic]||`A practical guide to ${topic.toLowerCase()} in business.` }
