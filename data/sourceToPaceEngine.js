/*
 * PACE 2C1 - Source to PACE application engine
 *
 * Converts verified 2A1 evidence into practical UNDERSTAND -> APPLY -> ACT
 * guidance. Country evidence is never invented. Application is contextualised
 * by scenario, industry, customer, relationship/deal stage and decision
 * environment, while the underlying cultural consideration remains source-backed.
 */
import { SOURCE_CONFIDENCE, SOURCE_STATUS } from './sourceIntelligence'
import { getScenarioEvidence } from './differentiationEngine'

const PILLARS = {
  P: 'Preparation & Trust',
  A: 'Alignment of Power',
  C: 'Communication Patterns',
  E: 'Execution & Risk'
}

const pillarTopicHints = {
  P: ['relationship', 'trust', 'formality', 'social'],
  A: ['decision', 'hierarchy', 'authority', 'consensus', 'agreement'],
  C: ['communication', 'negotiation', 'information processing', 'language', 'disagreement', 'silence', 'evidence'],
  E: ['time', 'punctuality', 'pace', 'process', 'risk', 'negotiation']
}

const stageLanguage = {
  P: {
    'New contact': 'At this early relationship stage, use the insight to calibrate how you establish credibility before asking for movement.',
    'Early relationship': 'At this stage, use the insight to deepen confidence while keeping the commercial purpose visible.',
    'Active opportunity': 'Now use the insight to protect trust while moving the opportunity forward.',
    'Negotiation': 'In negotiation, use the insight to protect the relationship while testing what is genuinely agreed.',
    'Existing partner': 'With an established partner, use the insight to maintain trust without over-formalising the relationship.'
  },
  A: {
    'Discovery': 'During discovery, use the insight to identify who needs to be involved before you design the decision path.',
    'Proposal': 'At proposal stage, make the material usable by everyone who must evaluate or advocate for it.',
    'Evaluation': 'During evaluation, map reviewers, influencers and approvers rather than relying on the visible contact.',
    'Negotiation': 'In negotiation, distinguish the person negotiating from the people who can approve, veto or shape the outcome.',
    'Contracting': 'At contracting stage, confirm that authority, approvals and the binding commitment path are explicit.',
    'Closing': 'At closing, confirm the person agreeing has the authority and internal alignment required for a real commitment.'
  },
  C: {
    'Discovery': 'In discovery, test how the counterpart communicates uncertainty and disagreement before choosing your own level of directness.',
    'Proposal': 'In a proposal, make the message easy to evaluate while leaving room for the counterpart to process and validate it.',
    'Evaluation': 'During evaluation, test ambiguous signals instead of treating silence, enthusiasm or hesitation as definitive.',
    'Negotiation': 'In negotiation, slow down interpretation of ambiguous responses and verify what the counterpart actually means.',
    'Closing': 'At closing, use explicit questions where appropriate, but verify that apparent agreement is actionable commitment.'
  },
  E: {
    'Discovery': 'Early in the process, identify timing, evidence and process requirements that could later become blockers.',
    'Proposal': 'At proposal stage, make evidence, implementation, compliance and risk controls easy to review.',
    'Evaluation': 'During evaluation, remove uncertainty with the evidence and process detail the decision group actually needs.',
    'Negotiation': 'In negotiation, clarify outstanding evidence, approvals, terms and the next decision point.',
    'Contracting': 'At contracting, make ownership, approvals, obligations and timing explicit.',
    'Closing': 'At closing, define what constitutes binding commitment and what still has to happen internally.'
  }
}

const scenarioActions = {
  'First meeting': {
    P: 'Open with credibility and discovery rather than forcing an early commercial outcome.',
    A: 'Ask who else will need to be comfortable before the organisation can move.',
    C: 'Listen for how questions, disagreement and uncertainty are expressed, then test your interpretation.',
    E: 'Finish with a concrete next step that fits the buyer’s actual process.'
  },
  'Relationship building': {
    P: 'Invest deliberately in the relationship while keeping a useful commercial next step visible.',
    A: 'Use the relationship to learn how influence and authority operate around the opportunity.',
    C: 'Learn how this contact prefers to communicate difficult information and disagreement.',
    E: 'Agree what happens next without manufacturing an artificial deadline.'
  },
  'Pitch / proposal': {
    P: 'Lead with the credibility signals that matter to the relevant decision group.',
    A: 'Build material that the wider stakeholder group can evaluate and reuse internally.',
    C: 'Present clearly, then leave enough space for questions, consultation and validation.',
    E: 'Make evidence, implementation, compliance, commercial terms and risk easy to find.'
  },
  'Negotiation': {
    P: 'Protect trust while keeping interests, constraints and the commercial objective clear.',
    A: 'Map who can negotiate, approve, influence and veto.',
    C: 'Decode objections and pauses before responding or escalating.',
    E: 'Clarify the evidence, terms, approvals and decision point required to move.'
  },
  'Closing a deal': {
    P: 'Reconfirm that the relationship is strong enough for the final commercial step.',
    A: 'Confirm authority and internal alignment before treating a positive response as binding.',
    C: 'Use explicit closing questions only when they fit the communication context, then verify commitment.',
    E: 'Define exactly who approves or signs, what remains outstanding and when commitment becomes real.'
  },
  'New market entry': {
    P: 'Research local credibility and relationship expectations before importing the existing sales process.',
    A: 'Map formal authority, influencers, partners, regulators and procurement.',
    C: 'Validate communication and meeting behaviour with local counterparts rather than assuming.',
    E: 'Identify compliance, evidence, implementation and risk expectations early.'
  },
  'Partnership': {
    P: 'Establish the trust and credibility needed for both organisations to work together.',
    A: 'Map decision rights, sponsors, operational owners and veto points on both sides.',
    C: 'Agree how difficult issues and disagreement will be surfaced.',
    E: 'Turn the relationship into explicit responsibilities, evidence, milestones and governance.'
  },
  'Deal has stalled': {
    P: 'Test whether the stall is a trust or credibility issue before changing the commercial offer.',
    A: 'Re-map the decision network and look for stakeholders or approvals you cannot see.',
    C: 'Reinterpret the last signal before escalating. Test whether silence, delay or a soft response means what you think it means.',
    E: 'Remove the actual blocker by supplying missing evidence, reassurance, approval or a practical next step.'
  },
  'Tender / RFP': {
    P: 'Make credibility easy to establish through references, evidence and a response the buyer can defend internally.',
    A: 'Map formal authority, technical evaluators, procurement and the wider decision group.',
    C: 'Make the response clear and easy to evaluate while avoiding assumptions about what an ambiguous signal means.',
    E: 'Make compliance, implementation, service commitments, risk and contract expectations traceable.'
  },
  'Government engagement': {
    P: 'Build institutional credibility before assuming access or enthusiasm equals support.',
    A: 'Map formal authority, institutional stakeholders, technical reviewers and approval paths.',
    C: 'Use careful questions to distinguish interest, consultation and actual commitment.',
    E: 'Document process, accountability, evidence, approvals and the next formal step.'
  }
}

function clean(s) { return String(s || '').trim() }
function hintsFor(pillar) { return pillarTopicHints[pillar] || [] }
function relevantEvidence(records, pillar) {
  const hints = hintsFor(pillar)
  return records.filter(record => {
    if (record.pacePillar === pillar) return true
    const topic = clean(record.topic).toLowerCase()
    return hints.some(h => topic.includes(h))
  })
}

function confidenceFor(evidence) {
  if (!evidence.length) return SOURCE_CONFIDENCE.FRAMEWORK_READY
  if (evidence.some(e => e.confidence === SOURCE_CONFIDENCE.DEEP_SOURCE)) return SOURCE_CONFIDENCE.DEEP_SOURCE
  return SOURCE_CONFIDENCE.SOURCE_INFORMED
}

function contextLine({ pillar, industry, customerType, relationshipStage, dealStage, decisionEnvironment }) {
  const parts = []
  if (industry && industry !== 'Other') parts.push(`For ${industry.toLowerCase()} sales`)
  if (customerType) parts.push(`with a ${customerType.toLowerCase()}`)
  if (decisionEnvironment) parts.push(`in a ${decisionEnvironment.toLowerCase()} environment`)
  if (relationshipStage) parts.push(`at the ${relationshipStage.toLowerCase()} relationship stage`)
  if (dealStage) parts.push(`during ${dealStage.toLowerCase()}`)
  if (!parts.length) return ''
  return `${parts.join(', ')}: ${stageLanguage[pillar]?.[dealStage || relationshipStage] || ''}`.trim()
}

function actionFor({ pillar, scenario, industry, customerType, relationshipStage, dealStage, decisionEnvironment, knownChallenge }) {
  let action = scenarioActions[scenario]?.[pillar] || scenarioActions['First meeting'][pillar]
  if (industry && industry !== 'Other') {
    const industryActions = {
      Aviation: ' Make technical, operational, regulatory and assurance evidence easy for the relevant stakeholders to use.',
      Government: ' Make governance, procurement, accountability and compliance evidence easy to review and defend.',
      Technology: ' Make technical proof, security and implementation evidence easy to evaluate.',
      Manufacturing: ' Make capability, quality, reliability and operational risk explicit.',
      Tourism: ' Keep service delivery and operational practicality visible alongside the relationship.',
      'Professional Services': ' Make expertise, references, scope and delivery credibility visible.'
    }
    action += industryActions[industry] || ''
  }
  if (customerType === 'Procurement team') action += ' Give procurement a clear compliance and commercial trail they can evaluate.'
  if (customerType === 'Technical team') action += ' Give technical reviewers the detail and evidence needed to validate the solution.'
  if (customerType === 'Regulator') action += ' Make regulatory basis, accountability and assurance easy to verify.'
  if (customerType === 'Government agency') action += ' Make the proposal defensible across governance, technical and commercial review.'
  if (decisionEnvironment === 'Consensus / committee') action += ' Prepare reusable material that can travel across the decision group rather than relying on one champion.'
  if (decisionEnvironment === 'Procurement-led') action += ' Keep compliance, evaluation criteria and commercial traceability explicit.'
  if (knownChallenge) action += ` Address the known challenge directly: ${clean(knownChallenge)}.`
  if (relationshipStage === 'Negotiation' || dealStage === 'Negotiation') action += ' Test what is genuinely agreed before increasing pressure.'
  return action
}

function buildPillar({ pillar, country, scenario, industry, customerType, relationshipStage, dealStage, decisionEnvironment, knownChallenge, communicationProfile, records }) {
  const evidence = relevantEvidence(records, pillar)
  const confidence = confidenceFor(evidence)
  const sourceIds = evidence.map(e => e.id)
  const sourceNames = [...new Set(evidence.map(e => e.source))]
  const primary = evidence[0]

  if (!evidence.length) {
    return {
      pillar,
      name: PILLARS[pillar],
      confidence,
      informationClass: 'SOURCE GAP',
      understand: 'No verified country-specific source evidence was found for this scenario and pillar.',
      apply: `Use the universal PACE framework for this situation. ${contextLine({ pillar, industry, customerType, relationshipStage, dealStage, decisionEnvironment })}`.trim(),
      act: actionFor({ pillar, scenario, industry, customerType, relationshipStage, dealStage, decisionEnvironment, knownChallenge }),
      sourceIds: [], sourceNames: [], why: 'There is no verified source record to support a country-specific claim here. PACE therefore does not invent one.',
      sourceEvidence: []
    }
  }

  const evidenceSummary = evidence.length === 1
    ? primary.sourceEvidence
    : evidence.slice(0, 2).map(e => e.sourceEvidence).join(' ')
  const interpretation = evidence.length === 1
    ? primary.interpretation
    : evidence.slice(0, 2).map(e => e.interpretation).filter(Boolean).join(' ')
  const adaptation = contextLine({ pillar, industry, customerType, relationshipStage, dealStage, decisionEnvironment })
  const profile = clean(communicationProfile)
    ? ` Your own communication profile is ${clean(communicationProfile)}. Use that as a self-calibration prompt, not as a description of the counterpart.`
    : ''

  return {
    pillar,
    name: PILLARS[pillar],
    confidence,
    informationClass: 'COUNTRY-SPECIFIC',
    understand: evidenceSummary,
    apply: `${interpretation}${adaptation ? ` ${adaptation}` : ''}${profile}`.trim(),
    act: actionFor({ pillar, scenario, industry, customerType, relationshipStage, dealStage, decisionEnvironment, knownChallenge }),
    sourceIds,
    sourceNames,
    why: `You're seeing this because the selected country has verified source evidence relevant to ${PILLARS[pillar].toLowerCase()} for this scenario.`,
    sourceEvidence: evidence
  }
}

export function buildSourceToPACE({
  country,
  scenario = 'First meeting',
  industry = 'Other',
  customerType = '',
  relationshipStage = '',
  dealStage = '',
  decisionEnvironment = '',
  knownChallenge = '',
  communicationProfile = ''
} = {}) {
  const records = getScenarioEvidence({ country, scenario })
  const pillars = ['P', 'A', 'C', 'E'].map(pillar => buildPillar({
    pillar, country, scenario, industry, customerType, relationshipStage, dealStage,
    decisionEnvironment, knownChallenge, communicationProfile, records
  }))
  const sourceIds = [...new Set(pillars.flatMap(p => p.sourceIds))]
  const countrySpecific = pillars.filter(p => p.informationClass === 'COUNTRY-SPECIFIC').length
  const confidence = countrySpecific ? SOURCE_CONFIDENCE.DEEP_SOURCE : SOURCE_CONFIDENCE.FRAMEWORK_READY

  const play = {
    DO: pillars.map(p => p.act).slice(0, 3),
    DONT: [
      'Do not treat a cultural pattern as a rule about the individual.',
      'Do not interpret silence, enthusiasm, hesitation or agreement without testing what it means.',
      'Do not use country guidance to replace stakeholder, commercial or technical discovery.'
    ],
    ASK: pillars.map(p => p.act).slice(0, 2).map((action, i) => i === 0 ? 'What would you need to see or understand before we take the next step?' : 'Who else needs to be comfortable with this before the organisation can move?'),
    BRING: [
      industry === 'Aviation' ? 'Bring traceable technical, operational, regulatory and assurance evidence.' : 'Bring evidence matched to the stakeholders who need to evaluate the opportunity.',
      'Bring a clear view of the decision path, outstanding questions and next step.'
    ],
    WATCH: pillars.map(p => p.understand).slice(0, 2),
    NEXT: [pillars[0].act, pillars[3].act]
  }

  const signals = pillars.map(p => ({
    category: p.name.toUpperCase(),
    signal: p.understand,
    meaning: p.apply,
    test: p.pillar === 'C' ? 'What specifically would you need to resolve or see before this becomes a firm next step?' : 'What would confirm that I am reading this situation correctly?',
    action: p.act,
    confidence: p.confidence,
    evidenceIds: p.sourceIds,
    why: p.why
  }))

  return {
    country, scenario, industry, customerType, relationshipStage, dealStage, decisionEnvironment, knownChallenge,
    pillars, play, signals, sourceIds,
    sourceEvidence: pillars.flatMap(p => p.sourceEvidence),
    sourceConfidence: confidence,
    principle: 'Culture gives you a hypothesis. The individual gives you the answer.'
  }
}

export { PILLARS }
