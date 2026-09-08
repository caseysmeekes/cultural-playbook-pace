/*
 * PACE 2B1 - Cross-source validation and country differentiation
 *
 * This layer consumes ONLY authoritative 2A1 evidence. It never turns a
 * framework template into country evidence. A country with no verified
 * evidence for a topic remains a SOURCE GAP.
 */
import { countries } from './countries'
import {
  verifiedSourceEvidence,
  SOURCE_STATUS,
  SOURCE_CONFIDENCE
} from './sourceIntelligence'

export const INFORMATION_CLASS = {
  UNIVERSAL: 'UNIVERSAL',
  COUNTRY_INFORMED: 'COUNTRY-INFORMED',
  COUNTRY_SPECIFIC: 'COUNTRY-SPECIFIC',
  SOURCE_GAP: 'SOURCE GAP'
}

export const fingerprintDimensions = [
  'Trust', 'Relationship', 'Hierarchy', 'Communication', 'Agreement',
  'Disagreement', 'Decision-making', 'Negotiation', 'Meetings', 'Evidence',
  'Process', 'Time'
]

const topicMap = {
  'Trust': ['trust', 'relationship'],
  'Relationship': ['relationship', 'social'],
  'Hierarchy': ['hierarchy', 'status', 'authority', 'decision-making'],
  'Communication': ['communication', 'information processing', 'language'],
  'Agreement': ['agreement', 'consensus'],
  'Disagreement': ['disagreement', 'negotiation', 'communication'],
  'Decision-making': ['decision-making', 'decision'],
  'Negotiation': ['negotiation'],
  'Meetings': ['meeting', 'meetings'],
  'Evidence': ['evidence', 'persuasion', 'information processing'],
  'Process': ['process', 'paperwork', 'risk'],
  'Time': ['time', 'punctuality', 'pace']
}

const scenarioAliases = {
  'First Meeting': 'First meeting',
  'First meeting': 'First meeting',
  'Relationship Building': 'Relationship building',
  'Relationship building': 'Relationship building',
  'Pitch / Proposal': 'Pitch / proposal',
  'Pitch / proposal': 'Pitch / proposal',
  'Negotiation': 'Negotiation',
  'Closing': 'Closing a deal',
  'Closing a deal': 'Closing a deal',
  'New Market Entry': 'New market entry',
  'New market entry': 'New market entry',
  'Partnership': 'Partnership',
  'Deal Stalled': 'Deal has stalled',
  'Deal has stalled': 'Deal has stalled',
  'Tender / RFP': 'Tender / RFP',
  'Government Engagement': 'Government engagement',
  'Government engagement': 'Government engagement'
}

function normaliseScenario(scenario = '') {
  return scenarioAliases[scenario] || scenario
}

function evidenceForCountry(countryName) {
  return verifiedSourceEvidence.filter(e => e.status === SOURCE_STATUS.VERIFIED && e.country === countryName)
}

function matchesTopic(record, dimension) {
  const terms = topicMap[dimension] || []
  const topic = String(record.topic || '').toLowerCase()
  return terms.some(term => topic.includes(term.toLowerCase()))
}

export function getCountryEvidence(countryName, { scenario = '', pillar = '', dimension = '' } = {}) {
  const targetScenario = normaliseScenario(scenario)
  return evidenceForCountry(countryName).filter(record => {
    const scenarioMatch = !targetScenario || (record.scenarioRelevance || []).map(normaliseScenario).includes(targetScenario)
    const pillarMatch = !pillar || record.pacePillar?.toLowerCase() === pillar.toLowerCase()
    const dimensionMatch = !dimension || matchesTopic(record, dimension)
    return scenarioMatch && pillarMatch && dimensionMatch
  })
}

export function classifyEvidence(record) {
  if (!record || record.status !== SOURCE_STATUS.VERIFIED) return INFORMATION_CLASS.SOURCE_GAP
  const strongTopics = ['decision-making', 'negotiation', 'communication', 'agreement', 'disagreement', 'evidence and persuasion', 'punctuality', 'time and meetings', 'formality and introductions']
  const topic = String(record.topic || '').toLowerCase()
  if (strongTopics.some(t => topic.includes(t))) return INFORMATION_CLASS.COUNTRY_SPECIFIC
  return INFORMATION_CLASS.COUNTRY_INFORMED
}

export function getCountryFingerprint(countryName) {
  const country = countries.find(c => c.name === countryName)
  const records = evidenceForCountry(countryName)
  const dimensions = Object.fromEntries(fingerprintDimensions.map(dimension => {
    const evidence = records.filter(record => matchesTopic(record, dimension))
    return [dimension, {
      informationClass: evidence.length ? classifyEvidence(evidence[0]) : INFORMATION_CLASS.SOURCE_GAP,
      source: evidence[0]?.source || null,
      sourceEvidence: evidence.map(e => e.sourceEvidence),
      evidenceIds: evidence.map(e => e.id),
      confidence: evidence.length ? evidence[0].confidence : null,
      paceRelevance: [...new Set(evidence.map(e => e.pacePillar).filter(Boolean))]
    }]
  }))

  return {
    country: countryName,
    region: country?.region || 'Global market',
    sourceCoverage: records.length ? 'PARTIAL VERIFIED EVIDENCE' : 'SOURCE GAP',
    evidenceCount: records.length,
    dimensions,
    principle: 'Culture gives you a hypothesis. The individual gives you the answer.'
  }
}

export function getScenarioEvidence({ country, scenario, pillar = '' } = {}) {
  return getCountryEvidence(country, { scenario, pillar }).map(record => ({
    ...record,
    informationClass: classifyEvidence(record)
  }))
}

export function buildEvidenceOverlay({ country, scenario, pillar, baseText = '' } = {}) {
  const evidence = getScenarioEvidence({ country, scenario, pillar })
  if (!evidence.length) {
    return {
      text: baseText,
      informationClass: INFORMATION_CLASS.SOURCE_GAP,
      evidenceIds: [],
      evidence: [],
      trace: 'No verified country-specific source evidence was found for this scenario/pillar. Universal framework guidance remains available.'
    }
  }

  const additions = evidence.map(e => e.interpretation).filter(Boolean)
  return {
    text: [baseText, ...additions].filter(Boolean).join(' '),
    informationClass: evidence.some(e => e.informationClass === INFORMATION_CLASS.COUNTRY_SPECIFIC)
      ? INFORMATION_CLASS.COUNTRY_SPECIFIC
      : INFORMATION_CLASS.COUNTRY_INFORMED,
    evidenceIds: evidence.map(e => e.id),
    evidence,
    trace: `Applied ${evidence.length} verified source record${evidence.length === 1 ? '' : 's'} from ${[...new Set(evidence.map(e => e.source))].join(', ')}.`
  }
}

export function buildCountryDifferentiatedPlay({ country, scenario = 'First Meeting', industry = 'Other', basePlay = {} } = {}) {
  const pillars = ['p', 'a', 'c', 'e']
  const overlay = {}
  const traces = []
  const evidenceIds = new Set()

  pillars.forEach(pillar => {
    const key = { p: 'do', a: 'ask', c: 'watch', e: 'next' }[pillar]
    const result = buildEvidenceOverlay({
      country,
      scenario,
      pillar,
      baseText: basePlay[key] || ''
    })
    overlay[key] = result.text
    overlay[`${key}Class`] = result.informationClass
    result.evidenceIds.forEach(id => evidenceIds.add(id))
    if (result.trace) traces.push(`${pillar.toUpperCase()}: ${result.trace}`)
  })

  const dont = buildEvidenceOverlay({ country, scenario, pillar: 'c', baseText: basePlay.dont || '' })
  overlay.dont = dont.text
  overlay.dontClass = dont.informationClass
  dont.evidenceIds.forEach(id => evidenceIds.add(id))
  traces.push(`C: ${dont.trace}`)

  return {
    ...basePlay,
    ...overlay,
    countryEvidenceIds: [...evidenceIds],
    sourceTrace: traces,
    differentiation: getCountryFingerprint(country)
  }
}

const comparisonPairs = [
  ['Japan', 'Germany'], ['Japan', 'India'], ['Japan', 'France'], ['Japan', 'United States'],
  ['Japan', 'New Zealand'], ['Germany', 'India'], ['Germany', 'France'],
  ['Germany', 'United States'], ['France', 'United States'], ['India', 'United States']
]

const testScenarios = [
  'First Meeting', 'Relationship Building', 'Pitch / Proposal', 'Negotiation', 'Closing',
  'New Market Entry', 'Partnership', 'Deal Stalled', 'Tender / RFP', 'Government Engagement'
]

function actionableKeys(play) {
  return ['do', 'dont', 'ask', 'watch', 'next'].map(key => String(play?.[key] || '').trim()).filter(Boolean)
}

export function detectSuspiciousSimilarity(leftPlay, rightPlay, leftCountry, rightCountry) {
  const leftEvidence = new Set(leftPlay?.countryEvidenceIds || [])
  const rightEvidence = new Set(rightPlay?.countryEvidenceIds || [])
  const evidenceDifference = [...new Set([...leftEvidence, ...rightEvidence])].filter(id => !leftEvidence.has(id) || !rightEvidence.has(id))
  const leftActions = actionableKeys(leftPlay)
  const rightActions = actionableKeys(rightPlay)
  const repeatedActions = leftActions.filter(action => rightActions.includes(action)).length
  const comparable = Math.max(leftActions.length, rightActions.length, 1)
  const overlap = repeatedActions / comparable

  return {
    leftCountry,
    rightCountry,
    overlap,
    repeatedRecommendations: repeatedActions,
    evidenceDifferenceCount: evidenceDifference.length,
    status: overlap >= 0.8 && evidenceDifference.length > 0 ? 'REVIEW' : 'PASS',
    reason: overlap >= 0.8 && evidenceDifference.length > 0
      ? 'Country evidence exists on both sides but the generated actions are excessively identical.'
      : 'No excessive country-switching overlap detected by the recommendation-key test.'
  }
}

export function runDifferentiationAudit(buildPlay) {
  const scenarioResults = []
  const pairResults = []
  const failures = []

  for (const scenario of testScenarios) {
    for (const [leftCountry, rightCountry] of comparisonPairs.slice(0, 5)) {
      const left = buildPlay({ country: leftCountry, activity: scenario, industry: 'Other' })
      const right = buildPlay({ country: rightCountry, activity: scenario, industry: 'Other' })
      const result = detectSuspiciousSimilarity(left, right, leftCountry, rightCountry)
      scenarioResults.push({ scenario, ...result })
      if (result.status === 'REVIEW') failures.push({ type: 'SIMILARITY', scenario, ...result })
    }
  }

  for (const [leftCountry, rightCountry] of comparisonPairs) {
    const left = getCountryFingerprint(leftCountry)
    const right = getCountryFingerprint(rightCountry)
    const leftIds = new Set(Object.values(left.dimensions).flatMap(d => d.evidenceIds))
    const rightIds = new Set(Object.values(right.dimensions).flatMap(d => d.evidenceIds))
    if (left.evidenceCount > 0 && right.evidenceCount > 0 && leftIds.size === rightIds.size && [...leftIds].every(id => rightIds.has(id))) {
      failures.push({ type: 'FINGERPRINT', leftCountry, rightCountry, reason: 'Two countries resolve to the same authoritative evidence set.' })
    }
    pairResults.push({ leftCountry, rightCountry, leftEvidenceCount: left.evidenceCount, rightEvidenceCount: right.evidenceCount })
  }

  return {
    status: failures.length ? 'FAIL' : 'PASS',
    scenariosTested: testScenarios.length,
    comparisonPairsTested: comparisonPairs.length,
    scenarioResults,
    pairResults,
    failures
  }
}

export function getSourceCoverageReport() {
  return countries.map(country => {
    const fingerprint = getCountryFingerprint(country.name)
    const p = Object.values(fingerprint.dimensions).filter(d => d.paceRelevance.includes('P')).length
    const a = Object.values(fingerprint.dimensions).filter(d => d.paceRelevance.includes('A')).length
    const c = Object.values(fingerprint.dimensions).filter(d => d.paceRelevance.includes('C')).length
    const e = Object.values(fingerprint.dimensions).filter(d => d.paceRelevance.includes('E')).length
    const gaps = Object.entries(fingerprint.dimensions).filter(([, value]) => value.informationClass === INFORMATION_CLASS.SOURCE_GAP).map(([key]) => key)
    const confidenceValues = Object.values(fingerprint.dimensions).map(d => d.confidence).filter(Boolean)
    const confidence = confidenceValues.includes(SOURCE_CONFIDENCE.DEEP_SOURCE) ? SOURCE_CONFIDENCE.DEEP_SOURCE : confidenceValues.length ? SOURCE_CONFIDENCE.SOURCE_INFORMED : SOURCE_CONFIDENCE.FRAMEWORK_READY
    return {
      country: country.name,
      sourceCoverage: fingerprint.sourceCoverage,
      pacePCoverage: p,
      paceACoverage: a,
      paceCCoverage: c,
      paceECoverage: e,
      majorEvidenceGaps: gaps,
      sourceConfidence: confidence,
      evidenceCount: fingerprint.evidenceCount
    }
  })
}

export { normaliseScenario }
