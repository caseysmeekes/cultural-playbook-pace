import { getCountryFingerprint, getScenarioEvidence, normaliseScenario } from './differentiationEngine'
import { SOURCE_CONFIDENCE } from './sourceIntelligence'

export const SCENARIOS = [
  'First Meeting',
  'Relationship Building',
  'Pitch / Proposal',
  'Negotiation',
  'Closing a Deal',
  'New Market Entry',
  'Partnership',
  'Deal Has Stalled',
  'Tender / RFP',
  'Government Engagement'
]

const SCENARIO_CONFIG = {
  'First Meeting': { label:'First meeting', pillar:'P', focus:['Trust','Meetings','Communication'] },
  'Relationship Building': { label:'Relationship building', pillar:'P', focus:['Trust','Relationship','Communication'] },
  'Pitch / Proposal': { label:'Pitch / proposal', pillar:'C', focus:['Communication','Evidence','Decision-making'] },
  'Negotiation': { label:'Negotiation', pillar:'C', focus:['Negotiation','Communication','Decision-making'] },
  'Closing a Deal': { label:'Closing a deal', pillar:'E', focus:['Decision-making','Process','Negotiation'] },
  'New Market Entry': { label:'New market entry', pillar:'P', focus:['Trust','Stakeholders','Process'] },
  'Partnership': { label:'Partnership', pillar:'P', focus:['Relationship','Trust','Decision-making'] },
  'Deal Has Stalled': { label:'Deal has stalled', pillar:'E', focus:['Negotiation','Disagreement','Decision-making','Process'] },
  'Tender / RFP': { label:'Tender / RFP', pillar:'E', focus:['Process','Evidence','Decision-making','Negotiation'] },
  'Government Engagement': { label:'Government engagement', pillar:'A', focus:['Hierarchy','Authority','Process','Stakeholders','Evidence'] }
}

const PILLAR_NAMES = { P:'Preparation & Trust', A:'Alignment of Power', C:'Communication Patterns', E:'Execution & Risk' }

const BASE = {
  'First Meeting': {
    know:'The first interaction is a chance to understand how trust, status, communication and meeting purpose operate in this specific organisation.',
    do:'Prepare enough to show credibility, then spend part of the meeting learning how the counterpart prefers to work.',
    say:'“Before we get into the detail, it would be useful to understand what matters most to your team.”',
    watch:'Notice who opens the discussion, who speaks for the group, how questions are handled and what creates confidence.',
    avoid:'Avoid assuming that warmth, silence, formality or speed has one universal meaning.',
    prepare:'A concise introduction, relevant evidence, meeting objective, stakeholder names and a short list of discovery questions.',
    next:'Send a concise follow-up confirming what you understood, the agreed next step and any information still required.'
  },
  'Relationship Building': {
    know:'Relationships can influence access, trust and the way business information is exchanged, but the relevant pattern must be tested with the individual and organisation.',
    do:'Invest in the relationship at a level that feels credible for the counterpart, while continuing to establish business value.',
    say:'“What would be useful for us to understand about how your organisation works before we take this further?”',
    watch:'Watch for invitations, introductions, personal context, repeated contact and signals about who needs to know or trust you.',
    avoid:'Avoid treating social interaction as a substitute for business credibility or assuming every counterpart wants the same level of relationship.',
    prepare:'Relevant introductions, background on stakeholders, useful local context and a reason for continued contact beyond the immediate transaction.',
    next:'Agree a natural next interaction and identify who else should be brought into the relationship.'
  },
  'Pitch / Proposal': {
    know:'A strong proposal needs to fit the way the customer evaluates evidence, risk, authority and value.',
    do:'Tailor the sequence and level of evidence to the customer’s decision environment rather than presenting the same pitch everywhere.',
    say:'“Which parts of the proposal will be most important for the people who need to evaluate it internally?”',
    watch:'Watch whether the audience prioritises technical evidence, relationships, senior endorsement, risk reduction, price or implementation detail.',
    avoid:'Avoid assuming that enthusiasm in the room equals internal approval.',
    prepare:'Decision criteria, proof points, references, implementation evidence, commercial assumptions and a stakeholder map.',
    next:'Confirm the evaluation process, decision-makers and evidence still needed before the proposal is considered complete.'
  },
  'Negotiation': {
    know:'Negotiation style is shaped by expectations around relationships, communication, authority, pace, concessions and decision-making.',
    do:'Separate what you know from what you are testing, and understand the counterpart’s internal decision process before trading concessions.',
    say:'“How does your team normally evaluate the options before agreeing the final position?”',
    watch:'Watch the use of silence, indirect disagreement, requests for more detail, movement on price and signals about who has authority.',
    avoid:'Avoid interpreting silence, politeness or delay as agreement without checking.',
    prepare:'Your priorities, walk-away points, evidence, concession sequence, approval dependencies and stakeholder map.',
    next:'Record the agreed points, unresolved issues, owners and decision path rather than relying on verbal momentum.'
  },
  'Closing a Deal': {
    know:'Closing depends on more than willingness to buy. Internal authority, process, risk and documentation can determine when a deal is actually ready.',
    do:'Make the path to signature explicit and identify every remaining approval or documentation dependency.',
    say:'“What needs to happen internally between agreement in principle and contract signature?”',
    watch:'Watch for new approvers, legal or procurement reviews, requests for documentation and changes in urgency.',
    avoid:'Avoid treating a positive meeting or verbal commitment as equivalent to an approved deal.',
    prepare:'Final commercial position, contract version, compliance material, approval map, implementation plan and owners.',
    next:'Create a dated close plan with each remaining approval, owner and dependency.'
  },
  'New Market Entry': {
    know:'Market entry requires understanding how trust, institutions, stakeholders, regulation, procurement and local decision-making affect access.',
    do:'Map the ecosystem before committing heavily, then validate assumptions through local conversations.',
    say:'“Who else needs to be comfortable with this approach before we could operate successfully here?”',
    watch:'Watch for gatekeepers, institutional requirements, local partners, informal influence and regulatory dependencies.',
    avoid:'Avoid assuming that a market structure or buying process will mirror your home market.',
    prepare:'Stakeholder map, regulatory questions, local partner options, evidence of credibility and an entry hypothesis.',
    next:'Test the market-entry hypothesis with a small number of credible local stakeholders and update the map.'
  },
  'Partnership': {
    know:'Partnerships require alignment on trust, authority, incentives, responsibilities, communication and how decisions will be made together.',
    do:'Define governance and decision rights early, alongside the commercial opportunity.',
    say:'“How should we make decisions together when our teams have different priorities?”',
    watch:'Watch for differences in ownership expectations, escalation paths, senior involvement and tolerance for ambiguity.',
    avoid:'Avoid assuming that shared commercial interest automatically creates shared operating expectations.',
    prepare:'Roles, governance model, escalation route, success measures, stakeholder map and initial operating principles.',
    next:'Agree the governance rhythm and document who can decide what.'
  },
  'Deal Has Stalled': {
    know:'A stalled deal may reflect missing authority, unresolved risk, communication differences, internal consultation or a genuine change in priorities.',
    do:'Diagnose the blockage before applying more pressure. Ask what has changed and where the decision is sitting.',
    say:'“What is the main issue preventing this from moving forward, and who needs to be involved to resolve it?”',
    watch:'Watch for slower responses, repeated requests for information, new stakeholders, unresolved objections or unclear ownership.',
    avoid:'Avoid assuming that silence means rejection, or that another sales push will solve an internal process problem.',
    prepare:'Open issues, evidence already supplied, stakeholder changes, decision dependencies and a reset proposal.',
    next:'Agree one concrete unblock action with an owner and a date, then reassess rather than repeatedly chasing.'
  },
  'Tender / RFP': {
    know:'Tender success depends on the formal process as well as how stakeholders interpret evidence, compliance, risk, governance and value.',
    do:'Treat the tender as a structured decision system. Map stakeholders, evaluation criteria, compliance requirements, governance and clarification windows.',
    say:'“Could you clarify how the evaluation team will assess this requirement and what evidence will demonstrate compliance?”',
    watch:'Track mandatory requirements, scoring logic, clarification responses, approval layers, procurement involvement and changes to the timetable.',
    avoid:'Avoid assuming the technical buyer is the only decision-maker or that a strong solution can compensate for a missed formal requirement.',
    prepare:'Stakeholder map, compliance matrix, technical evidence, references, governance model, assumptions, clarification log and award-to-contract plan.',
    next:'Build a requirement-to-evidence matrix and identify every unresolved clarification, approval and contracting dependency.'
  },
  'Government Engagement': {
    know:'Government engagement often involves formal authority, institutional roles, documentation, accountability and multiple stakeholders with different responsibilities.',
    do:'Respect the formal process while mapping the people who influence, review, approve or implement the decision.',
    say:'“Could you help us understand the formal approval process and which stakeholders need to be involved at each stage?”',
    watch:'Watch for mandate boundaries, senior approval, procurement rules, regulatory dependencies, documentation requirements and accountability concerns.',
    avoid:'Avoid assuming that access to one official equals institutional approval.',
    prepare:'Institutional map, mandate questions, compliance evidence, references, governance material, documentation and a clear audit trail.',
    next:'Confirm the formal pathway, stakeholder responsibilities and the evidence required for the next approval gate.'
  }
}

function evidenceForScenario(country, scenario) {
  const config = SCENARIO_CONFIG[scenario]
  const all = getScenarioEvidence({ country, scenario:normaliseScenario(scenario) })
  const focused = all.filter(record => config.focus.some(term => String(record.topic || '').toLowerCase().includes(term.toLowerCase())))
  return focused.length ? focused : all
}

function confidenceFor(evidence) {
  if (evidence.some(e => e.confidence === SOURCE_CONFIDENCE.DEEP_SOURCE)) return SOURCE_CONFIDENCE.DEEP_SOURCE
  if (evidence.length) return SOURCE_CONFIDENCE.SOURCE_INFORMED
  return SOURCE_CONFIDENCE.FRAMEWORK_READY
}

function countryOverlay(base, evidence) {
  if (!evidence.length) return base
  const interpretations = evidence.slice(0,3).map(e => e.interpretation).filter(Boolean)
  const sourceText = evidence.slice(0,2).map(e => e.sourceEvidence).filter(Boolean).join(' ')
  const first = interpretations[0]
  return {
    ...base,
    know: [first || base.know, base.know].filter(Boolean).join(' '),
    do: first ? `${first} Use that observation as a hypothesis, then adapt the behaviour to the organisation.` : base.do,
    watch: interpretations.slice(0,2).join(' ') || base.watch,
    avoid: 'Do not turn the source observation into a deterministic rule. Test it with the individual, organisation and situation.',
    sourceText
  }
}

export function buildCountryScenario({ country, scenario } = {}) {
  const selected = SCENARIOS.includes(scenario) ? scenario : 'First Meeting'
  const config = SCENARIO_CONFIG[selected]
  const evidence = evidenceForScenario(country, selected)
  const fingerprint = getCountryFingerprint(country)
  const confidence = confidenceFor(evidence)
  const base = BASE[selected]
  const play = countryOverlay(base, evidence)
  const gap = !evidence.length

  const stakeholderEvidence = getScenarioEvidence({ country, scenario:normaliseScenario(selected), dimension:'Decision-making' })
  const processEvidence = getScenarioEvidence({ country, scenario:normaliseScenario(selected), dimension:'Process' })

  return {
    country,
    scenario:selected,
    label:config.label,
    pillar:config.pillar,
    pillarName:PILLAR_NAMES[config.pillar],
    confidence,
    informationClass:gap ? 'SOURCE GAP' : 'COUNTRY-SPECIFIC',
    sourceGap:gap,
    sourceText:play.sourceText || 'Source gap: no verified country-specific evidence is currently loaded for this scenario.',
    evidence,
    evidenceIds:evidence.map(e => e.id),
    fingerprint,
    ...play,
    tender:selected === 'Tender / RFP' ? buildTenderLayer(country, selected) : null,
    government:selected === 'Government Engagement' ? buildGovernmentLayer(country, selected) : null,
    stakeholderEvidence,
    processEvidence,
    guardrail:'Culture gives you a hypothesis. The individual gives you the answer.'
  }
}

function buildTenderLayer(country, scenario) {
  const dimensions = ['Decision-making','Evidence','Process','Negotiation']
  return Object.fromEntries(dimensions.map(dimension => [dimension, getScenarioEvidence({ country, scenario:normaliseScenario(scenario), dimension }).map(e => ({ id:e.id, topic:e.topic, source:e.source, evidence:e.sourceEvidence, confidence:e.confidence }))]))
}

function buildGovernmentLayer(country, scenario) {
  const dimensions = ['Hierarchy','Decision-making','Process','Evidence']
  return Object.fromEntries(dimensions.map(dimension => [dimension, getScenarioEvidence({ country, scenario:normaliseScenario(scenario), dimension }).map(e => ({ id:e.id, topic:e.topic, source:e.source, evidence:e.sourceEvidence, confidence:e.confidence }))]))
}

export function searchCountryScenarios(query='') {
  const q=String(query).toLowerCase().trim()
  return SCENARIOS.filter(s=>!q||s.toLowerCase().includes(q)).map(s=>({scenario:s,label:SCENARIO_CONFIG[s].label,pillar:SCENARIO_CONFIG[s].pillar}))
}
