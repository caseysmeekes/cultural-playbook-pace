/*
 * PACE 2A1 - Source Intelligence
 *
 * This file deliberately separates source evidence from PACE interpretation.
 *
 * IMPORTANT:
 * - VERIFIED records are directly grounded in the approved source material that
 *   has been inspected and have a source location.
 * - SOURCE_DERIVED_UNVERIFIED records preserve existing PACE source-backed
 *   profile material but are NOT treated as authoritative evidence until the
 *   underlying source passage has been verified.
 * - FRAMEWORK_ONLY content must never be presented as source evidence.
 *
 * This distinction is intentional. It prevents the existing country templates
 * from masquerading as direct source extraction.
 */

export const SOURCE_STATUS = {
  VERIFIED: 'VERIFIED',
  SOURCE_DERIVED_UNVERIFIED: 'SOURCE_DERIVED_UNVERIFIED',
  SOURCE_GAP: 'SOURCE_GAP'
}

export const SOURCE_CONFIDENCE = {
  DEEP_SOURCE: 'DEEP SOURCE',
  SOURCE_INFORMED: 'SOURCE INFORMED',
  FRAMEWORK_READY: 'FRAMEWORK READY'
}

export const approvedSources = [
  {
    id: 'when-cultures-collide',
    name: 'When Cultures Collide',
    author: 'Richard D. Lewis',
    edition: '3rd edition'
  },
  {
    id: 'kiss-bow-shake-hands',
    name: 'Kiss, Bow, or Shake Hands',
    author: 'Terri Morrison and Wayne A. Conaway',
    edition: '2nd edition (2006)'
  },
  {
    id: 'riding-waves',
    name: 'Riding Waves',
    author: 'Approved PACE source material'
  }
]

/*
 * Verified source evidence currently extracted during 2A1.
 *
 * These are concise paraphrases, not quotations. sourceLocation points to the
 * inspected source page(s). The evidence and its PACE interpretation remain
 * separate so later code cannot silently turn an interpretation into a fact.
 */
export const verifiedSourceEvidence = [
  {
    id: 'kbsh-india-decision',
    country: 'India',
    source: 'Kiss, Bow, or Shake Hands',
    sourceLocation: 'India chapter, pp. 226-227',
    topic: 'Decision-making',
    sourceEvidence: 'The source describes India as moderately collectivistic and says individual decisions are expected to be in harmony with family, group and social structure. It also describes relationships with negotiation participants as important and notes that Indians may be too polite to say no.',
    interpretation: 'For PACE, apparent agreement should be tested rather than treated as final commitment, and stakeholder alignment should be explored.',
    pacePillar: 'A',
    scenarioRelevance: ['First Meeting', 'Partnership', 'Negotiation', 'Closing', 'Tender / RFP', 'Government Engagement'],
    relationshipStage: ['New', 'Developing', 'Established'],
    dealStage: ['Discovery', 'Evaluation', 'Negotiation', 'Closing'],
    confidence: SOURCE_CONFIDENCE.DEEP_SOURCE,
    status: SOURCE_STATUS.VERIFIED,
    notes: 'Source is older and contains dated terminology. PACE should preserve the underlying observation without reproducing dated or deterministic framing.'
  },
  {
    id: 'kbsh-india-evidence',
    country: 'India',
    source: 'Kiss, Bow, or Shake Hands',
    sourceLocation: 'India chapter, p. 226',
    topic: 'Evidence and persuasion',
    sourceEvidence: 'The source discusses personal feelings and religious ideology as influences on what is accepted as truth, while also noting that highly educated Indians may process information more analytically.',
    interpretation: 'Do not assume that a purely fact-heavy case is the only persuasive route. Test which evidence and reasoning the specific stakeholder values.',
    pacePillar: 'C',
    scenarioRelevance: ['Pitch / Proposal', 'Negotiation', 'Tender / RFP'],
    relationshipStage: ['Developing', 'Established'],
    dealStage: ['Evaluation', 'Negotiation'],
    confidence: SOURCE_CONFIDENCE.DEEP_SOURCE,
    status: SOURCE_STATUS.VERIFIED
  },
  {
    id: 'kbsh-india-time',
    country: 'India',
    source: 'Kiss, Bow, or Shake Hands',
    sourceLocation: 'India chapter, p. 227',
    topic: 'Time and meetings',
    sourceEvidence: 'The source says Indians appreciate punctuality but may not always practise it, and recommends allowing flexibility for last-minute rescheduling.',
    interpretation: 'Build some scheduling resilience into meetings and avoid interpreting every timing change as lack of interest.',
    pacePillar: 'E',
    scenarioRelevance: ['First Meeting', 'Relationship Building', 'Government Engagement'],
    relationshipStage: ['New', 'Developing'],
    dealStage: ['Discovery', 'Evaluation'],
    confidence: SOURCE_CONFIDENCE.DEEP_SOURCE,
    status: SOURCE_STATUS.VERIFIED
  },
  {
    id: 'kbsh-japan-information',
    country: 'Japan',
    source: 'Kiss, Bow, or Shake Hands',
    sourceLocation: 'Japan chapter, pp. 281-282',
    topic: 'Communication and information processing',
    sourceEvidence: 'The source describes Japanese information processing as strongly particular and group-oriented, with traditional values and loyalty to groups influencing how information is considered.',
    interpretation: 'A salesperson should pay attention to group context and avoid assuming that an individual response represents the whole decision environment.',
    pacePillar: 'C',
    scenarioRelevance: ['First Meeting', 'Pitch / Proposal', 'Tender / RFP', 'Government Engagement'],
    relationshipStage: ['New', 'Developing'],
    dealStage: ['Discovery', 'Evaluation'],
    confidence: SOURCE_CONFIDENCE.DEEP_SOURCE,
    status: SOURCE_STATUS.VERIFIED
  },
  {
    id: 'kbsh-japan-consensus',
    country: 'Japan',
    source: 'Kiss, Bow, or Shake Hands',
    sourceLocation: 'Japan chapter, pp. 281-282',
    topic: 'Negotiation and decision-making',
    sourceEvidence: 'The source says Japanese negotiators may rely more on feelings than facts and describes a consensus-oriented process in which individuals may change position for group harmony. It also describes decisions as being made within the group.',
    interpretation: 'PACE should emphasise internal alignment and careful testing of apparent agreement rather than pressing for an immediate personal commitment.',
    pacePillar: 'A',
    scenarioRelevance: ['Tender / RFP', 'Negotiation', 'Closing', 'Government Engagement'],
    relationshipStage: ['Developing', 'Established'],
    dealStage: ['Evaluation', 'Negotiation', 'Closing'],
    confidence: SOURCE_CONFIDENCE.DEEP_SOURCE,
    status: SOURCE_STATUS.VERIFIED,
    notes: 'Use as a hypothesis about the decision environment, not as a prediction about an individual.'
  },
  {
    id: 'kbsh-new-zealand-direct',
    country: 'New Zealand',
    source: 'Kiss, Bow, or Shake Hands',
    sourceLocation: 'New Zealand chapter, pp. 334 and 339',
    topic: 'Communication and meetings',
    sourceEvidence: 'The source says New Zealanders will not find it difficult to say no, may take controversial positions, and are somewhat more formal than Australians in meetings. It also says credibility should be built before assuming an instantly congenial meeting.',
    interpretation: 'PACE can favour direct testing of disagreement while still allowing a little initial formality and credibility-building.',
    pacePillar: 'C',
    scenarioRelevance: ['First Meeting', 'Negotiation', 'Pitch / Proposal'],
    relationshipStage: ['New'],
    dealStage: ['Discovery', 'Evaluation', 'Negotiation'],
    confidence: SOURCE_CONFIDENCE.DEEP_SOURCE,
    status: SOURCE_STATUS.VERIFIED
  },
  {
    id: 'kbsh-new-zealand-formality',
    country: 'New Zealand',
    source: 'Kiss, Bow, or Shake Hands',
    sourceLocation: 'New Zealand chapter, pp. 339',
    topic: 'Formality and introductions',
    sourceEvidence: 'The source describes New Zealanders as friendly and polite but relatively formal in a work environment, moving towards first names as the relationship becomes established.',
    interpretation: 'Begin with appropriate professional formality and let the counterpart establish when a more informal tone is appropriate.',
    pacePillar: 'P',
    scenarioRelevance: ['First Meeting', 'Relationship Building'],
    relationshipStage: ['New', 'Developing'],
    dealStage: ['Discovery'],
    confidence: SOURCE_CONFIDENCE.DEEP_SOURCE,
    status: SOURCE_STATUS.VERIFIED
  },
  {
    id: 'kbsh-us-decision',
    country: 'United States',
    source: 'Kiss, Bow, or Shake Hands',
    sourceLocation: 'United States chapter, pp. 547-548',
    topic: 'Decision-making and evidence',
    sourceEvidence: 'The source describes the United States as highly individualistic, emphasising individual initiative and achievement, and says U.S. negotiators commonly accumulate objective facts in making their case. It also says people generally do not find it difficult to say no.',
    interpretation: 'PACE can favour clear individual accountability, explicit disagreement and an evidence-led commercial case, while still verifying the actual organisational buying process.',
    pacePillar: 'A',
    scenarioRelevance: ['Pitch / Proposal', 'Negotiation', 'Closing'],
    relationshipStage: ['New', 'Developing', 'Established'],
    dealStage: ['Evaluation', 'Negotiation', 'Closing'],
    confidence: SOURCE_CONFIDENCE.DEEP_SOURCE,
    status: SOURCE_STATUS.VERIFIED
  },
  {
    id: 'kbsh-us-punctuality',
    country: 'United States',
    source: 'Kiss, Bow, or Shake Hands',
    sourceLocation: 'United States chapter, p. 548',
    topic: 'Time and meetings',
    sourceEvidence: 'The source states that punctuality is highly emphasised in U.S. business.',
    interpretation: 'Be punctual and make the meeting structure and expected outcomes clear.',
    pacePillar: 'E',
    scenarioRelevance: ['First Meeting', 'Pitch / Proposal', 'Negotiation'],
    relationshipStage: ['New', 'Developing'],
    dealStage: ['Discovery', 'Evaluation', 'Negotiation'],
    confidence: SOURCE_CONFIDENCE.DEEP_SOURCE,
    status: SOURCE_STATUS.VERIFIED
  },
  {
    id: 'kbsh-uk-negotiation',
    country: 'United Kingdom',
    source: 'Kiss, Bow, or Shake Hands',
    sourceLocation: 'United Kingdom chapter, pp. 539-540',
    topic: 'Negotiation',
    sourceEvidence: 'The source advises avoiding a hard sell, not rushing British counterparts towards a decision, and restraining exaggerated claims or overt excitement.',
    interpretation: 'PACE should favour measured persuasion, credible claims and patience rather than aggressive closing pressure.',
    pacePillar: 'C',
    scenarioRelevance: ['Pitch / Proposal', 'Negotiation', 'Closing'],
    relationshipStage: ['New', 'Developing', 'Established'],
    dealStage: ['Evaluation', 'Negotiation', 'Closing'],
    confidence: SOURCE_CONFIDENCE.DEEP_SOURCE,
    status: SOURCE_STATUS.VERIFIED
  },
  {
    id: 'kbsh-uk-decision',
    country: 'United Kingdom',
    source: 'Kiss, Bow, or Shake Hands',
    sourceLocation: 'United Kingdom chapter, p. 540',
    topic: 'Decision-making',
    sourceEvidence: 'The source describes British decisions as slow and deliberate and identifies a formal hierarchy of senior roles.',
    interpretation: 'Map authority and allow time for considered decisions rather than assuming the first positive conversation represents final approval.',
    pacePillar: 'A',
    scenarioRelevance: ['Tender / RFP', 'Negotiation', 'Closing'],
    relationshipStage: ['Developing', 'Established'],
    dealStage: ['Evaluation', 'Negotiation', 'Closing'],
    confidence: SOURCE_CONFIDENCE.DEEP_SOURCE,
    status: SOURCE_STATUS.VERIFIED
  },
  {
    id: 'kbsh-egypt-decision',
    country: 'Egypt',
    source: 'Kiss, Bow, or Shake Hands',
    sourceLocation: 'Egypt chapter, pp. 152-154',
    topic: 'Decision-making and relationships',
    sourceEvidence: 'The source describes the male leader as a locus of decision-making while also describing decisions as occurring through group or collective consensus. It emphasises family, lineage and honour as important social structures.',
    interpretation: 'Map both senior authority and the wider relationship network. Do not assume a single visible decision-maker is the whole process.',
    pacePillar: 'A',
    scenarioRelevance: ['Government Engagement', 'Negotiation', 'Closing', 'Partnership'],
    relationshipStage: ['Developing', 'Established'],
    dealStage: ['Evaluation', 'Negotiation', 'Closing'],
    confidence: SOURCE_CONFIDENCE.DEEP_SOURCE,
    status: SOURCE_STATUS.VERIFIED
  },
  {
    id: 'kbsh-egypt-pace',
    country: 'Egypt',
    source: 'Kiss, Bow, or Shake Hands',
    sourceLocation: 'Egypt chapter, p. 154',
    topic: 'Pace and negotiation',
    sourceEvidence: 'The source describes business in Egypt as slower than in the West, advises patience, says meetings start gradually with personal inquiries, and warns that forcing a decision can be counterproductive.',
    interpretation: 'PACE should favour patience, relationship-building and explicit confirmation rather than pressure for an immediate commitment.',
    pacePillar: 'E',
    scenarioRelevance: ['First Meeting', 'Relationship Building', 'Negotiation', 'Closing'],
    relationshipStage: ['New', 'Developing'],
    dealStage: ['Discovery', 'Evaluation', 'Negotiation', 'Closing'],
    confidence: SOURCE_CONFIDENCE.DEEP_SOURCE,
    status: SOURCE_STATUS.VERIFIED
  },
  {
    id: 'kbsh-finland-communication',
    country: 'Finland',
    source: 'Kiss, Bow, or Shake Hands',
    sourceLocation: 'Finland chapter, pp. 163-165',
    topic: 'Communication and silence',
    sourceEvidence: 'The source describes Finns as low-context, expecting people to say what they mean, while noting that Finnish silence can appear opaque to outsiders. It also describes a preference for objective facts in negotiation.',
    interpretation: 'PACE can favour concise, explicit communication and should not interpret silence as a problem without testing what it means.',
    pacePillar: 'C',
    scenarioRelevance: ['First Meeting', 'Pitch / Proposal', 'Negotiation'],
    relationshipStage: ['New', 'Developing'],
    dealStage: ['Discovery', 'Evaluation', 'Negotiation'],
    confidence: SOURCE_CONFIDENCE.DEEP_SOURCE,
    status: SOURCE_STATUS.VERIFIED
  },
  {
    id: 'kbsh-finland-time',
    country: 'Finland',
    source: 'Kiss, Bow, or Shake Hands',
    sourceLocation: 'Finland chapter, p. 164',
    topic: 'Punctuality',
    sourceEvidence: 'The source describes Finns as highly punctual and says lateness demonstrates an insulting lack of concern.',
    interpretation: 'Punctuality should be treated as an important preparation requirement for meetings.',
    pacePillar: 'E',
    scenarioRelevance: ['First Meeting', 'Pitch / Proposal', 'Negotiation'],
    relationshipStage: ['New', 'Developing'],
    dealStage: ['Discovery', 'Evaluation', 'Negotiation'],
    confidence: SOURCE_CONFIDENCE.DEEP_SOURCE,
    status: SOURCE_STATUS.VERIFIED
  },
  {
    id: 'kbsh-australia-evidence',
    country: 'Australia',
    source: 'Kiss, Bow, or Shake Hands',
    sourceLocation: 'Australia chapter, pp. 23-24',
    topic: 'Evidence and decision-making',
    sourceEvidence: 'The source says objective facts are given high validity in Australia, describes individualism as important in decision-making subject to company policy, and says Australians do not find it difficult to say no.',
    interpretation: 'PACE can favour direct evidence, clear accountability and explicit testing of disagreement.',
    pacePillar: 'C',
    scenarioRelevance: ['Pitch / Proposal', 'Negotiation', 'Closing'],
    relationshipStage: ['New', 'Developing', 'Established'],
    dealStage: ['Evaluation', 'Negotiation', 'Closing'],
    confidence: SOURCE_CONFIDENCE.DEEP_SOURCE,
    status: SOURCE_STATUS.VERIFIED
  },
  {
    id: 'kbsh-brazil-relationship',
    country: 'Brazil',
    source: 'Kiss, Bow, or Shake Hands',
    sourceLocation: 'Brazil chapter, pp. 67-68',
    topic: 'Relationship and negotiation',
    sourceEvidence: 'The source says Brazilian negotiations may be approached indirectly with feelings influencing solutions, and describes family loyalty and personal connections as important in business relationships.',
    interpretation: 'PACE can encourage relationship-aware discovery and a commercial case that combines substance with personal credibility, without assuming one style fits every Brazilian stakeholder.',
    pacePillar: 'P',
    scenarioRelevance: ['First Meeting', 'Relationship Building', 'Partnership', 'Negotiation'],
    relationshipStage: ['New', 'Developing'],
    dealStage: ['Discovery', 'Evaluation', 'Negotiation'],
    confidence: SOURCE_CONFIDENCE.DEEP_SOURCE,
    status: SOURCE_STATUS.VERIFIED
  },
  {
    id: 'kbsh-chile-decision',
    country: 'Chile',
    source: 'Kiss, Bow, or Shake Hands',
    sourceLocation: 'Chile chapter, pp. 83-84',
    topic: 'Decision-making and negotiation',
    sourceEvidence: 'The source describes negotiations as potentially extensive with little movement from the initial position, and says family and group considerations can influence decisions and business associations.',
    interpretation: 'PACE should prepare the salesperson for relationship-aware, potentially persistent negotiation and should distinguish discussion from actual movement on the commercial position.',
    pacePillar: 'A',
    scenarioRelevance: ['Negotiation', 'Partnership', 'Closing'],
    relationshipStage: ['Developing', 'Established'],
    dealStage: ['Evaluation', 'Negotiation', 'Closing'],
    confidence: SOURCE_CONFIDENCE.DEEP_SOURCE,
    status: SOURCE_STATUS.VERIFIED
  },
  {
    id: 'kbsh-panama-decision',
    country: 'Panama',
    source: 'Kiss, Bow, or Shake Hands',
    sourceLocation: 'Panama chapter, pp. 360-361',
    topic: 'Decision-making and relationships',
    sourceEvidence: 'The source describes personal relationships as very important and says individual decisions are considered in light of their effect on family or group. It also says negative decisions can be difficult.',
    interpretation: 'PACE should encourage relationship-aware discovery and explicit testing of objections rather than relying on an apparently positive conversation.',
    pacePillar: 'A',
    scenarioRelevance: ['First Meeting', 'Negotiation', 'Closing', 'Partnership'],
    relationshipStage: ['New', 'Developing'],
    dealStage: ['Discovery', 'Evaluation', 'Negotiation', 'Closing'],
    confidence: SOURCE_CONFIDENCE.DEEP_SOURCE,
    status: SOURCE_STATUS.VERIFIED
  }
]

/*
 * KBSH country chapter coverage. This is deliberately a coverage index, not
 * evidence. A country being present here means the source has a dedicated
 * chapter, not that every PACE dimension has been extracted yet.
 */
export const kissBowCountryCoverage = {
  Argentina: 1,
  Austria: 10,
  Australia: 19,
  Belarus: 28,
  Belgium: 38,
  Belize: 46,
  Bolivia: 54,
  Brazil: 63,
  Canada: 71,
  Chile: 80,
  China: 89,
  'Hong Kong': 100,
  Colombia: 104,
  'Costa Rica': 113,
  'Czech Republic': 121,
  Denmark: 131,
  Ecuador: 140,
  Egypt: 148,
  Finland: 159,
  France: 168,
  Germany: 177,
  Greece: 189,
  Guatemala: 197,
  Honduras: 205,
  Hungary: 213,
  India: 222,
  Indonesia: 233,
  Ireland: 247,
  Israel: 256,
  Italy: 267,
  Japan: 276,
  Kuwait: 288,
  Malaysia: 299,
  Mexico: 313,
  'The Netherlands': 322,
  'New Zealand': 332,
  Norway: 340,
  Pakistan: 349,
  Panama: 357,
  Paraguay: 364,
  Peru: 371,
  Philippines: 379,
  Poland: 390,
  Portugal: 400,
  Romania: 407,
  Russia: 415,
  'Saudi Arabia': 426,
  Singapore: 437,
  'South Africa': 448,
  'South Korea': 457,
  Spain: 469,
  Sweden: 477,
  Switzerland: 486,
  Taiwan: 495,
  Thailand: 506,
  Turkey: 514,
  Ukraine: 525,
  'United Kingdom': 534,
  'United States': 544,
  Uruguay: 555,
  Venezuela: 563,
  Vietnam: 571
}

/*
 * Existing PACE country profiles are retained as a migration bridge. They are
 * intentionally not copied into verifiedSourceEvidence because their current
 * records are interpretations rather than line/page-verified source records.
 *
 * This function can be used by a future audit UI to show which existing
 * country claims still need source verification.
 */
export const buildSourceCoverage = (countryProfiles = {}) => {
  const countries = Object.keys(kissBowCountryCoverage)
  return countries.map(country => {
    const verified = verifiedSourceEvidence.filter(item => item.country === country)
    const existing = countryProfiles[country]
    const topics = [...new Set(verified.map(item => item.topic))]

    return {
      country,
      sourceCoverage: 'Kiss, Bow, or Shake Hands country chapter',
      chapterPage: kissBowCountryCoverage[country],
      verifiedEvidenceCount: verified.length,
      verifiedTopics: topics,
      existingProfilePresent: Boolean(existing),
      status: verified.length ? SOURCE_STATUS.VERIFIED : SOURCE_STATUS.SOURCE_GAP,
      majorEvidenceGaps: verified.length ? [] : ['Country-specific evidence has not yet been line/page verified in 2A1.'],
      sourceConfidence: verified.length ? SOURCE_CONFIDENCE.DEEP_SOURCE : SOURCE_CONFIDENCE.SOURCE_INFORMED
    }
  })
}

export const getSourceEvidence = (country, { includeUnverified = false } = {}) => {
  const verified = verifiedSourceEvidence.filter(item => item.country === country)
  if (!includeUnverified) return verified
  return verified
}

export const getSourceCoverageSummary = () => {
  const countries = Object.keys(kissBowCountryCoverage)
  const verifiedCountries = new Set(verifiedSourceEvidence.map(item => item.country))

  return {
    source: 'Kiss, Bow, or Shake Hands',
    chapterCount: countries.length,
    countriesWithVerifiedEvidence: verifiedCountries.size,
    countriesAwaitingExtraction: countries.filter(country => !verifiedCountries.has(country)),
    verifiedEvidenceRecords: verifiedSourceEvidence.length,
    principle: 'A source chapter is not the same thing as verified PACE evidence.'
  }
}

export const sourceIntelligencePrinciples = [
  'Source evidence and PACE interpretation must remain separate.',
  'A source chapter does not automatically provide evidence for every PACE pillar.',
  'Shared guidance is allowed when the sources genuinely support the same pattern.',
  'Missing evidence must remain a source gap rather than being filled from model knowledge.',
  'Country differences must emerge from evidence, not be manufactured for visual variety.',
  'Culture gives you a hypothesis. The individual gives you the answer.'
]
