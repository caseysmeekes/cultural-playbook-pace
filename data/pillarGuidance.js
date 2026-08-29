export const pillarGuidance = {
  p: {
    question:'How does this market build credibility?',
    meaning:'Preparation & Trust is about understanding what makes you credible before you ask the buyer to move.',
    apply:'Adapt the opening to the market. Decide whether to lead with data and efficiency or spend more time building rapport and relationship capital.',
    act:'Change the next interaction: adjust relationship time, agenda, people involved or evidence brought.',
    checks:['I know what will establish credibility here','I have prepared for the right amount of relationship-building','I have adapted my opening rather than using my home-market default'],
    example:'If the market is relationship-based, do not treat rapport as time lost before the real meeting. Make relationship-building part of the sales process.'
  },
  a: {
    question:'Who actually holds authority to buy?',
    meaning:'Alignment of Power is about understanding how a decision moves through the organisation, not simply who has the job title.',
    apply:'Map the formal decision-maker, influencers, technical reviewers, procurement, finance and internal champions. Adapt your material to the way the decision is actually made.',
    act:'Build a stakeholder map and give each person what they need to advocate internally. In a consensus environment, make the champion able to take your proposal sideways through the organisation.',
    checks:['I know who can approve the decision','I have identified the people who influence the decision','I have material the wider decision group can use','I know whether the process is top-down or consensus-driven'],
    example:'Tender example: if the buyer uses consensus decision-making, do not give one contact a brilliant pitch deck and assume they can carry it. Provide strong, reusable documentation covering technical, commercial, operational, compliance and risk questions so the proposal can survive review across the team.'
  },
  c: {
    question:'How are objections really expressed?',
    meaning:'Communication Patterns is about interpreting the meaning behind what is said, not just the words you hear.',
    apply:'Adjust directness, questioning, silence and meeting behaviour to the communication context. Pay attention to how disagreement and uncertainty are expressed.',
    act:'Before responding to an ambiguous signal, pause and test your interpretation. Use a culturally appropriate follow-up question rather than immediately pushing for a yes or filling silence.',
    checks:['I know how direct I should be','I know how disagreement may be expressed','I can recognise a possible soft no','I will not automatically interpret politeness as commitment'],
    example:'A request to review internally may be genuine internal alignment rather than stalling. Ask what information the team needs and agree a useful next step instead of creating artificial pressure.'
  },
  e: {
    question:'What does a binding commitment look like?',
    meaning:'Execution & Risk is about understanding how the buyer becomes comfortable enough to commit and what evidence reduces uncertainty.',
    apply:'Match the close to uncertainty tolerance. Where uncertainty is high, over-index on compliance, SLAs, case studies, references, implementation detail and risk controls.',
    act:'Turn cultural insight into a concrete close: provide missing evidence, identify the approval step, confirm the owner and agree the next decision point.',
    checks:['I know what evidence reduces uncertainty','I understand the approval and commitment process','I have addressed compliance, risk and implementation concerns','I know what the next binding step actually is'],
    example:'Tender example: where risk sensitivity is high, a persuasive presentation is not enough. Make the response easy to evaluate with traceable evidence, clear compliance mapping, service commitments, implementation detail and relevant case studies.'
  }
}

export function getActivityApplication(key, activity, industry) {
  const sector = industry || 'your industry'
  const map = {
    'First meeting': {p:'Use the first meeting to establish the type of credibility this buyer values before rushing into the pitch.',a:'Use the meeting to discover the decision architecture. Ask who else will need to be comfortable before the organisation can move.',c:'Observe how questions, disagreement and silence are handled. Do not judge the communication style against your home-market default.',e:'Do not force a close that the buying process cannot support. Finish with a clear, culturally appropriate next step.'},
    'Relationship building': {p:'Treat relationship-building as commercial preparation when the market relies on trust and rapport.',a:'Use the relationship to understand who influences the decision and how information moves internally.',c:'Listen for indirect signals and learn how the contact prefers to communicate difficult information.',e:'Agree what happens next without turning a relationship conversation into an artificial sales deadline.'},
    'Pitch / proposal': {p:`Frame the ${sector.toLowerCase()} proposition around the credibility signals this market values, not just product features.`,a:'Design the proposal so the right people can evaluate it and advocate for it internally. Consensus requires lateral documentation, not just an executive pitch.',c:'Present clearly while leaving room for questions, internal consultation and face-saving where required.',e:'Make risk, implementation, evidence, compliance and commercial next steps easy to find and easy to defend internally.'},
    'Negotiation': {p:'Protect the trust you have built while keeping the commercial objective clear.',a:'Know who can negotiate, who can approve and who can veto. Do not confuse the person at the table with the whole decision system.',c:'Decode objections before responding. A pause, indirect answer or request for more time may have a different meaning from the one your home-market lens assigns to it.',e:'Clarify evidence, risk, terms, approvals and the next decision point so both sides know what moves the deal forward.'},
    'Closing a deal': {p:'Reconfirm that credibility and trust are strong enough for the buyer to take the final step.',a:'Confirm that every required stakeholder has been aligned and that the person saying yes has the authority to make it binding.',c:'Ask explicit closing questions only where the communication context supports them. Otherwise clarify the decision process without unnecessary pressure.',e:'Define exactly what constitutes commitment, who signs or approves, what remains outstanding and when the agreement becomes real.'},
    'New market entry': {p:'Research how credibility and relationships are established before importing your existing sales process.',a:'Map the local buying ecosystem, including formal authority, influencers, partners, regulators and procurement.',c:'Validate communication style, materials and meeting behaviour before going live in-market.',e:'Identify local compliance, risk, implementation and evidence expectations early so they do not become late-stage blockers.'},
    'Deal has stalled': {p:'Ask whether the stall is actually a trust problem rather than a product or price problem.',a:'Re-map the decision network. The deal may be waiting on stakeholders you cannot see.',c:'Reinterpret the last signals before escalating. A soft no, silence or request for internal review may have been misread.',e:'Remove the blocker rather than simply adding pressure. Ask what evidence, approval or risk reassurance is needed to move.'}
  }
  return map[activity]?.[key] || ''
}
