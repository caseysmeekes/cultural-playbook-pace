/*
 * PACE 3A - Actionable sales insights
 *
 * Turns the source-backed PACE application into a short list of sales moves.
 * Cultural evidence remains the basis. The engine does not infer hidden intent.
 */

const PILLAR_LABELS = {
  P: 'Preparation & Trust',
  A: 'Alignment of Power',
  C: 'Communication Patterns',
  E: 'Execution & Risk'
}

const MOVE_TEMPLATES = {
  P: {
    title: 'Protect credibility before pushing the deal',
    phrase: 'What would help you feel comfortable taking the next step with us?',
    response: 'Use the answer to identify the trust, credibility or relationship requirement that needs attention before you increase commercial pressure.'
  },
  A: {
    title: 'Map the real decision path',
    phrase: 'Who else needs to be comfortable with this before the organisation can move forward?',
    response: 'Use the answer to separate your current contact from the people who influence, approve or can block the decision.'
  },
  C: {
    title: 'Test the meaning of the signal',
    phrase: 'What would you need to see or resolve before this becomes a firm next step?',
    response: 'Do not fill an ambiguous response with your own assumption. Ask a question that makes the underlying concern or commitment easier to test.'
  },
  E: {
    title: 'Turn the next step into something concrete',
    phrase: 'What specifically needs to happen next, who owns it, and when should we reconnect?',
    response: 'Leave the interaction with an observable next step rather than relying on a general expression of interest.'
  }
}

const SCENARIO_PRIORITY = {
  'First meeting': ['P', 'A', 'C'],
  'Relationship building': ['P', 'C', 'A'],
  'Pitch / proposal': ['A', 'E', 'C'],
  'Negotiation': ['A', 'C', 'E'],
  'Closing a deal': ['A', 'E', 'C'],
  'New market entry': ['P', 'A', 'E'],
  'Partnership': ['P', 'A', 'E'],
  'Deal has stalled': ['C', 'A', 'E'],
  'Tender / RFP': ['A', 'E', 'P'],
  'Government engagement': ['A', 'E', 'C']
}

function clean(value) { return String(value || '').trim() }

function priorityFor(scenario, pillar) {
  const order = SCENARIO_PRIORITY[scenario] || ['P', 'A', 'C']
  const index = order.indexOf(pillar)
  return index === -1 ? 9 : index
}

function contextModifier({ industry, customerType, dealStage, knownChallenge }) {
  const modifiers = []
  if (industry && industry !== 'Other') modifiers.push(`Apply this in the context of ${industry.toLowerCase()} sales.`)
  if (customerType) modifiers.push(`The current buyer context is ${customerType.toLowerCase()}.`)
  if (dealStage) modifiers.push(`The deal is at ${dealStage.toLowerCase()} stage.`)
  if (knownChallenge) modifiers.push(`Known challenge to test directly: ${clean(knownChallenge)}.`)
  return modifiers.join(' ')
}

export function buildActionableInsights({
  application,
  scenario = 'First meeting',
  industry = 'Other',
  customerType = '',
  dealStage = '',
  knownChallenge = ''
} = {}) {
  const pillars = Array.isArray(application?.pillars) ? application.pillars : []
  const ranked = [...pillars]
    .filter(Boolean)
    .sort((a, b) => priorityFor(scenario, a.pillar) - priorityFor(scenario, b.pillar))
    .slice(0, 3)

  return ranked.map((pillar, index) => {
    const template = MOVE_TEMPLATES[pillar.pillar] || MOVE_TEMPLATES.C
    const evidence = Array.isArray(pillar.sourceEvidence) ? pillar.sourceEvidence : []
    const sourceIds = Array.isArray(pillar.sourceIds) ? pillar.sourceIds : []
    const trigger = clean(pillar.understand) || 'A relevant situation or signal appears in the interaction.'
    const why = clean(pillar.apply) || 'Use the PACE framework to test the situation rather than assuming intent.'

    return {
      rank: index + 1,
      pillar: pillar.pillar,
      pillarName: PILLAR_LABELS[pillar.pillar] || pillar.pillar,
      title: template.title,
      trigger,
      action: clean(pillar.act) || template.response,
      phrase: template.phrase,
      response: template.response,
      why,
      confidence: pillar.confidence,
      informationClass: pillar.informationClass,
      sourceIds,
      sourceCount: sourceIds.length,
      context: contextModifier({ industry, customerType, dealStage, knownChallenge }),
      sourceEvidence: evidence
    }
  })
}

export function buildActionableSummary({ application, scenario, industry, customerType, dealStage, knownChallenge } = {}) {
  const insights = buildActionableInsights({ application, scenario, industry, customerType, dealStage, knownChallenge })
  return {
    headline: insights[0]?.title || 'Use the PACE framework to test the situation.',
    insights,
    principle: 'Culture gives you a hypothesis. The individual gives you the answer.'
  }
}
