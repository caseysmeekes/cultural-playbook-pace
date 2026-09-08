import { countries } from './countries'
import { countryFacts } from './facts'
import { globalFacts } from './globalFacts'
import { pillarGuidance, getActivityApplication } from './pillarGuidance'

export const sourceLevels = {
  deep: 'DEEP SOURCE',
  informed: 'SOURCE INFORMED',
  ready: 'FRAMEWORK READY'
}

const activityDefaults = {
  'First meeting': 'Use the first interaction to learn how credibility, authority and communication work before forcing a commercial outcome.',
  'Relationship building': 'Treat relationship development as part of the commercial process while keeping the next practical step visible.',
  'Pitch / proposal': 'Make the proposition easy for the relevant stakeholders to understand, evaluate and advocate internally.',
  'Negotiation': 'Protect trust while clarifying interests, authority, constraints, evidence and the real path to agreement.',
  'Closing a deal': 'Confirm that the people, evidence and approvals needed for a binding commitment are actually aligned.',
  'New market entry': 'Adapt the go-to-market process to local decision structures, communication patterns, relationships and risk expectations.',
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

function getFacts(country) {
  return countryFacts[country.name] || globalFacts[country.name] || []
}

function getSourceStatus(country) {
  if (country.sourceLevel) return country.sourceLevel
  if (country.sourceBacked) return sourceLevels.informed
  return sourceLevels.ready
}

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
    communicationPatterns: country.c,
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

export function buildYourPlay({ country: countryOrName, activity = 'First meeting', industry = 'Other', buyerType = '', relationshipStage = '' } = {}) {
  const country = getCountry(countryOrName)
  const intelligence = getCountryIntelligence(country)
  const p = getActivityApplication('p', activity, industry)
  const a = getActivityApplication('a', activity, industry)
  const c = getActivityApplication('c', activity, industry)
  const e = getActivityApplication('e', activity, industry)
  const context = activityDefaults[activity] || activityDefaults['First meeting']
  const buyer = buyerType ? ` Keep the needs of the ${buyerType.toLowerCase()} in view.` : ''
  const relationship = relationshipStage ? ` You are at the ${relationshipStage.toLowerCase()} stage, so calibrate the next ask accordingly.` : ''

  return {
    country: country.name,
    activity,
    industry,
    buyerType,
    relationshipStage,
    do: p || intelligence.preparationTrust,
    dont: `Do not export your home-market default unchanged. ${intelligence.communication}`,
    ask: `${a || 'Clarify the decision path.'}${buyer}${relationship}`,
    bring: `Bring evidence that helps the relevant stakeholders evaluate the opportunity. ${intelligence.executionRisk}`,
    watch: `Watch for signals that could be misread, especially around agreement, silence, authority and timing. ${intelligence.communication}`,
    next: `Make the next step explicit: owner, action, approval or decision point. ${e || intelligence.executionRisk}`,
    context,
    industryLens: industryLenses[industry] || industryLenses.Other,
    sourceConfidence: intelligence.sourceConfidence
  }
}

export function buildSignals({ country: countryOrName, activity = 'First meeting', industry = 'Other' } = {}) {
  const country = getCountry(countryOrName)
  const intelligence = getCountryIntelligence(country)
  return [
    {
      category: 'RELATIONSHIP',
      signal: intelligence.relationship,
      meaning: 'This may indicate how much relationship capital or trust matters before the next commercial ask.',
      test: 'What would help us build enough confidence to take the next step?',
      action: 'Use the answer to calibrate the amount of relationship-building and commercial pressure.'
    },
    {
      category: 'HIERARCHY & AUTHORITY',
      signal: intelligence.hierarchy,
      meaning: 'The visible contact may not be the only person who can influence or approve the decision.',
      test: 'Who else will need to be comfortable with this before the organisation can move forward?',
      action: 'Map formal authority, influencers, reviewers and potential blockers.'
    },
    {
      category: 'AGREEMENT & DISAGREEMENT',
      signal: intelligence.communication,
      meaning: 'Agreement, hesitation or disagreement may be expressed differently from your home-market norm.',
      test: 'What specifically would you need to see or resolve before this becomes a firm next step?',
      action: 'Validate ambiguous signals instead of treating politeness or enthusiasm as commitment.'
    },
    {
      category: 'DECISION & URGENCY',
      signal: intelligence.decisionMaking,
      meaning: 'The pace of a decision may reflect internal process, stakeholder alignment or risk review rather than lack of interest.',
      test: 'What is the next internal decision point, and who owns it?',
      action: 'Align your follow-up to the actual decision process rather than applying artificial urgency.'
    },
    {
      category: 'SILENCE & MEETING ENGAGEMENT',
      signal: intelligence.meeting,
      meaning: 'Silence, limited challenge or restrained participation can have several explanations.',
      test: 'Would it be useful to pause here and hear any concerns or questions before we continue?',
      action: 'Create space for the counterpart to respond without forcing a public position.'
    },
    {
      category: 'NEXT STEPS',
      signal: intelligence.executionRisk,
      meaning: 'Interest only becomes commercially useful when the commitment path is clear.',
      test: 'What needs to happen internally for this to become a firm next step?',
      action: 'Confirm owner, evidence, approval and timing in a way that fits the buying process.'
    }
  ].map(signal => ({ ...signal, activity, industry }))
}

export function buildScenarioBrief({ country: countryOrName, activity = 'First meeting', industry = 'Other', buyerType = '', relationshipStage = '' } = {}) {
  const country = getCountry(countryOrName)
  const intelligence = getCountryIntelligence(country)
  const play = buildYourPlay({ country, activity, industry, buyerType, relationshipStage })
  return {
    ...intelligence,
    activity,
    industry,
    buyerType,
    relationshipStage,
    play,
    signals: buildSignals({ country, activity, industry }),
    activityContext: activityDefaults[activity] || activityDefaults['First meeting'],
    industryLens: industryLenses[industry] || industryLenses.Other,
    principle: 'Culture gives you a hypothesis. The individual gives you the answer.'
  }
}

export { getCountry, getSourceStatus }
