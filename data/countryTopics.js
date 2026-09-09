import { getScenarioEvidence } from './differentiationEngine'
import { getCountryIntelligence } from './decisionEngine'

export const TOPIC_TAXONOMY = [
  { id:'trust', label:'Trust', pillar:'P', topics:['First impressions','Relationship building','Credibility','Hospitality','Networking','Formality'] },
  { id:'power', label:'Power', pillar:'A', topics:['Hierarchy','Seniority','Authority','Stakeholders','Decision-makers','Influencers','Consensus'] },
  { id:'communication', label:'Communication', pillar:'C', topics:['Directness','Indirectness','Silence','Listening','Questions','Disagreement','Agreement','Feedback','Written communication','Email','Presentations'] },
  { id:'meetings', label:'Meetings', topics:['Preparation','Opening','Agenda','Participation','Discussion','Decision','Closing','Follow-up'] },
  { id:'negotiation', label:'Negotiation', topics:['Preparation','Opening','Bargaining','Price','Concessions','Objections','Silence','Deadlock','Closing'] },
  { id:'decision-making', label:'Decision Making', pillar:'A', topics:['Individual decisions','Group decisions','Consensus','Evidence','Authority','Internal consultation','Timing'] },
  { id:'etiquette', label:'Business Etiquette', pillar:'P', topics:['Greetings','Names','Titles','Dress','Business cards','Gifts','Dining','Hospitality'] },
  { id:'execution', label:'Execution', pillar:'E', topics:['Time','Punctuality','Planning','Process','Contracts','Commitments','Follow-up','Risk'] },
  { id:'government', label:'Government', pillar:'A', topics:['Institutions','Formality','Authority','Procurement','Regulation','Stakeholders','Documentation'] }
]

const normalise = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()
const PILLAR_NAMES = { P:'Preparation & Trust', A:'Alignment of Power', C:'Communication Patterns', E:'Execution & Risk' }
const topicPillar = topic => TOPIC_TAXONOMY.find(section => section.topics.includes(topic))?.pillar || ({Meetings:'C',Negotiation:'C'}[TOPIC_TAXONOMY.find(section=>section.topics.includes(topic))?.label] || 'C')

function evidenceFor(country, topic) {
  const records = getScenarioEvidence({ country, scenario:'First Meeting' })
  const q = normalise(topic)
  return records.filter(record => {
    const haystack = [record.topic, record.sourceEvidence, record.interpretation].map(normalise).join(' ')
    return haystack.includes(q) || q.split(' ').some(word => word.length > 4 && haystack.includes(word))
  })
}

function fallbackIntelligence(country, topic) {
  const intelligence = getCountryIntelligence(country)
  const p = topicPillar(topic)
  return p === 'P' ? intelligence.preparationTrust : p === 'A' ? intelligence.alignmentPower : p === 'C' ? intelligence.communicationPatterns : intelligence.executionRisk
}

export function buildCountryTopic({ country, topic } = {}) {
  const evidence = evidenceFor(country, topic)
  const pillar = topicPillar(topic)
  const pillarName = PILLAR_NAMES[pillar]
  const intelligence = getCountryIntelligence(country)

  if (!evidence.length) {
    return {
      country, topic, pillar, pillarName, confidence:'FRAMEWORK READY', informationClass:'SOURCE GAP',
      explanation:'Source gap: no verified country-specific evidence is currently loaded for this topic.',
      sources:[], businessImplication:'Use the topic as a preparation question, not as a country fact.',
      example:'Start by asking how this organisation normally handles this topic, then compare the answer with your expectations.',
      watchFor:'Look for signals that help you understand the individual organisation rather than confirming a cultural stereotype.',
      testHypothesis:'What would confirm or challenge my initial assumption here?',
      do:'Use the topic to prepare questions and validate the actual business context.',
      avoid:'Do not assume the country-level pattern applies to every person or organisation.',
      related:relatedTopics(topic),
      pillarContext:fallbackIntelligence(country, topic),
      guardrail:true
    }
  }

  const primary = evidence[0]
  const summary = evidence.slice(0,2).map(e=>e.sourceEvidence).join(' ')
  const interpretation = evidence.slice(0,2).map(e=>e.interpretation).filter(Boolean).join(' ')
  return {
    country, topic, pillar, pillarName, confidence:'DEEP SOURCE', informationClass:'COUNTRY-SPECIFIC',
    explanation:summary,
    sources:evidence,
    businessImplication:interpretation || `Consider how ${topic.toLowerCase()} may affect the business interaction, then test it with the counterpart.`,
    example:exampleFor(topic),
    watchFor:`Watch for signals around ${topic.toLowerCase()} without treating one interaction as proof of a country-wide rule.`,
    testHypothesis:`What would confirm or challenge my reading of ${topic.toLowerCase()} in this organisation?`,
    do:`Use the source-backed observation as a hypothesis and test it against the person, organisation and situation.`,
    avoid:'Do not turn a source observation into a deterministic rule about the individual.',
    related:relatedTopics(topic),
    pillarContext:p === 'P' ? intelligence.preparationTrust : p === 'A' ? intelligence.alignmentPower : p === 'C' ? intelligence.communicationPatterns : intelligence.executionRisk,
    guardrail:true
  }
}

function exampleFor(topic) {
  const examples = {
    'Silence':'After asking a question, allow space for the response. If silence follows, test what it means rather than filling the gap with your own assumption.',
    'Consensus':'If several stakeholders are involved, provide material they can review internally and ask what still needs alignment before a decision.',
    'Preparation':'Before the meeting, identify the outcomes you need, the evidence required and the people likely to shape the discussion.',
    'Follow-up':'After the interaction, confirm the agreed next step, owner and timing in the format the counterpart expects.',
    'Punctuality':'Treat the meeting start time as part of your preparation, while validating how the specific organisation manages schedules.',
    'Disagreement':'Ask a neutral follow-up question when you are unsure whether an objection is final, exploratory or simply a request for more information.'
  }
  return examples[topic] || `Before acting on ${topic.toLowerCase()}, ask how the specific organisation normally approaches it and compare that answer with the available country evidence.`
}

function relatedTopics(topic) {
  const map = {
    Silence:['Communication','Meetings','Negotiation','Disagreement'], Consensus:['Decision Making','Authority','Stakeholders','Negotiation'], Hierarchy:['Seniority','Authority','Decision-makers','Meetings'], Disagreement:['Communication','Feedback','Silence','Negotiation'], Punctuality:['Time','Meetings','Follow-up'], 'Business cards':['Introductions','Names','Formality']
  }
  return map[topic] || []
}

export function searchCountryTopics(query='') {
  const q = normalise(query)
  if (!q) return TOPIC_TAXONOMY.flatMap(section => section.topics.map(topic=>({topic,section:section.label,pillar:section.pillar||null})))
  return TOPIC_TAXONOMY.flatMap(section => section.topics.filter(topic=>normalise(topic).includes(q) || normalise(section.label).includes(q)).map(topic=>({topic,section:section.label,pillar:section.pillar||null})))
}
