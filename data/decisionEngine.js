import { countries } from './countries'
import { countryFacts } from './facts'
import { globalFacts } from './globalFacts'
import { buildSourceToPACE } from './sourceToPaceEngine'

export const sourceLevels = { deep: 'DEEP SOURCE', informed: 'SOURCE INFORMED', ready: 'FRAMEWORK READY' }

const activityDefaults = {
  'First meeting': 'Use the first interaction to learn how credibility, authority and communication work before forcing a commercial outcome.',
  'Relationship building': 'Treat relationship development as part of the commercial process while keeping the next practical step visible.',
  'Pitch / proposal': 'Make the proposition easy for the relevant stakeholders to understand, evaluate and advocate internally.',
  'Negotiation': 'Protect trust while clarifying interests, authority, constraints, evidence and the real path to agreement.',
  'Closing a deal': 'Confirm that the people, evidence and approvals needed for a binding commitment are actually aligned.',
  'New market entry': 'Adapt the go-to-market process to local decision structures, communication patterns, relationships and risk expectations.',
  'Partnership': 'Build the relationship and operating model around the actual stakeholders, incentives, responsibilities and decision path.',
  'Deal has stalled': 'Diagnose the stall before escalating. Re-check trust, stakeholders, communication signals, approvals and commercial blockers.',
  'Tender / RFP': 'Make the response easy to evaluate across the decision group, with clear evidence, compliance, implementation and risk coverage.',
  'Government engagement': 'Map formal authority, stakeholders, process and accountability while building credibility with the relevant institution.'
}

const industryLenses = {
  Technology: 'For technology sales, make technical credibility, security, implementation and proof easy for the wider decision group to assess.',
  Aviation: 'For aviation, expect multiple technical, operational, regulatory and commercial stakeholders. Make evidence and assurance easy to trace.',
  Government: 'For government, make governance, procurement, accountability, compliance and evidence easy to review and defend internally.',
  'Professional Services': 'For professional services, make expertise, references, delivery approach, scope and trust signals visible.',
  'Food & Beverage': 'For food and beverage, balance relationship, commercial practicality, supply considerations and clear execution expectations.',
  Manufacturing: 'For manufacturing, make capability, quality, reliability, implementation and operational risk explicit.',
  Tourism: 'For tourism, balance relationship and experience with clear commercial expectations, service delivery and operational detail.',
  Other: 'Use the industry as a commercial context layer, while keeping the cultural guidance grounded in the selected market.'
}

function getCountry(countryOrName) {
  if (typeof countryOrName === 'object' && countryOrName?.name) return countryOrName
  return countries.find(c => c.name === countryOrName) || countries[0]
}
function getFacts(country) { return countryFacts[country.name] || globalFacts[country.name] || [] }
function getSourceStatus(country) { return country.sourceLevel || (country.sourceBacked ? sourceLevels.informed : sourceLevels.ready) }

export function getCountryIntelligence(countryOrName) {
  const country = getCountry(countryOrName)
  return {
    country: country.name,
    region: country.region || 'Global market',
    sourceBasis: country.basis || country.source || 'PACE framework and loaded country profile',
    sourceConfidence: getSourceStatus(country),
    pace: { p: country.p, a: country.a, c: country.c, e: country.e },
    preparationTrust: country.p,
    alignmentPower: country.a,
    communicationPatterns: country.communication || country.c,
    executionRisk: country.e,
    relationship: country.relationship || country.p,
    hierarchy: country.hierarchy || country.a,
    communication: country.communication || country.c,
    decisionMaking: country.decisionMaking || country.a,
    negotiation: country.negotiation || country.c,
    meeting: country.meeting || country.c,
    signals: country.signals || [],
    doDont: country.doDont || null,
    facts: getFacts(country)
  }
}

function makeApplication(args) { return buildSourceToPACE({ ...args, country: getCountry(args.country).name }) }

export function buildYourPlay(args = {}) {
  const country = getCountry(args.country)
  const activity = args.activity || 'First meeting'
  const industry = args.industry || 'Other'
  const application = makeApplication({ ...args, country, scenario: activity, industry })
  return {
    country: country.name,
    activity,
    industry,
    buyerType: args.buyerType || '',
    relationshipStage: args.relationshipStage || '',
    dealStage: args.dealStage || '',
    decisionEnvironment: args.decisionEnvironment || '',
    knownChallenge: args.knownChallenge || '',
    do: application.play.DO[0],
    dont: application.play.DONT.join(' '),
    ask: application.play.ASK[0],
    bring: application.play.BRING.join(' '),
    watch: application.play.WATCH.join(' '),
    next: application.play.NEXT.join(' '),
    context: activityDefaults[activity] || activityDefaults['First meeting'],
    industryLens: industryLenses[industry] || industryLenses.Other,
    sourceConfidence: application.sourceConfidence,
    sourceEvidence: application.sourceEvidence,
    sourceEvidenceIds: application.sourceIds,
    sourceTrace: application.pillars.map(p => `${p.name}: ${p.why}`),
    paceBrief: application
  }
}

export function buildSignals(args = {}) {
  const country = getCountry(args.country)
  const activity = args.activity || 'First meeting'
  const application = makeApplication({ ...args, country, scenario: activity })
  return application.signals.map(signal => ({ ...signal, activity, industry: args.industry || 'Other', buyerType: args.buyerType || '', relationshipStage: args.relationshipStage || '', dealStage: args.dealStage || '', decisionEnvironment: args.decisionEnvironment || '' }))
}

export function buildScenarioBrief(args = {}) {
  const country = getCountry(args.country)
  const activity = args.activity || 'First meeting'
  const industry = args.industry || 'Other'
  const application = makeApplication({ ...args, country, scenario: activity, industry })
  const play = buildYourPlay({ ...args, country, activity, industry })
  return {
    ...getCountryIntelligence(country),
    activity,
    industry,
    buyerType: args.buyerType || '',
    relationshipStage: args.relationshipStage || '',
    dealStage: args.dealStage || '',
    decisionEnvironment: args.decisionEnvironment || '',
    knownChallenge: args.knownChallenge || '',
    activityContext: activityDefaults[activity] || activityDefaults['First meeting'],
    industryLens: industryLenses[industry] || industryLenses.Other,
    play,
    signals: application.signals,
    sourceEvidence: application.sourceEvidence,
    sourceEvidenceIds: application.sourceIds,
    sourceConfidence: application.sourceConfidence,
    paceBrief: application,
    preparationTrust: application.pillars[0].apply,
    alignmentPower: application.pillars[1].apply,
    communicationPatterns: application.pillars[2].apply,
    executionRisk: application.pillars[3].apply,
    principle: application.principle
  }
}

export { getCountry, getSourceStatus }
