import { countryProfiles } from './profiles'

const framework = {
  p: 'Preparation & Trust: How does this market build credibility? Add country-specific trust, relationship and discovery guidance.',
  a: 'Alignment of Power: Who actually holds authority to buy? Add hierarchy, decision rights, seniority and stakeholder guidance.',
  c: 'Communication Patterns: How are objections really expressed? Add context, directness, silence, face and negotiation cues.',
  e: 'Execution & Risk: What does a binding commitment look like? Add uncertainty, compliance, proof, process, timing and closing guidance.'
}

const sourced = {
  'China': { p:'Build trust through relationships and context before treating engagement as a transaction.', a:'Map formal hierarchy and the people who influence the decision. Protect face when challenging or negotiating.', c:'High-context communication can carry meaning through tone, implication and what is left unsaid. Do not assume polite interest is commitment.', e:'Use evidence, process and risk reassurance where appropriate. Confirm what constitutes a real commitment rather than relying on enthusiasm alone.' },
  'India': { p:'Treat relationship building and credibility as part of discovery, not as a delay before the pitch.', a:'Identify both formal authority and the people who influence the decision. Equip internal champions with useful documentation.', c:'Use respectful, contextual communication and test understanding rather than assuming a quick yes is final agreement.', e:'Allow for layered decisions and establish clear next steps, owners and evidence requirements.' },
  'Indonesia': { p:'Slow down and build rapport before pitching. Relationship quality can materially affect commercial progress.', a:'Understand seniority and informal influence, not just the person listed as the buyer.', c:'Indonesia is treated in the Playbook as a high-context market where meaning can sit in tone, implication and silence. Decode rather than force a blunt response.', e:'Prioritise trust, patience and face-saving while making the practical commitment and next step explicit.' },
  'Japan': { p:'Credibility is strengthened by preparation, respect, consistency and relationship quality before the hard sell.', a:'Respect seniority and identify the real decision network. Match appropriate rank and do not assume the person speaking is the final decision-maker.', c:'High-context communication means silence, tone and implication matter. A quiet or polite response should not automatically be read as agreement.', e:'Expect careful evaluation and place weight on reliability, process, evidence and risk reduction before asking for commitment.' },
  'South Korea': { p:'Prepare thoroughly and establish credibility with the right level of seniority.', a:'Hierarchy matters. Identify the senior decision-maker and match rank appropriately rather than bypassing the hierarchy.', c:'Use context and respect. Avoid putting someone in a position where disagreement creates loss of face.', e:'Support the decision with evidence, process and clear internal justification. Confirm the commitment path and decision sequence.' },
  'Malaysia': { p:'Relationship-led engagement, trust and respectful rapport should be built before pushing hard on the transaction.', a:'Map formal authority alongside informal influence and pay attention to seniority.', c:'Use polite, measured communication and avoid creating unnecessary confrontation or loss of face.', e:'Be patient and clear about process, responsibilities and the evidence needed to move towards commitment.' },
  'Singapore': { p:'Demonstrate competence, preparation and commercial credibility while keeping the engagement professional.', a:'Understand the organisation and decision structure, then engage the appropriate level of authority.', c:'Communication is generally more explicit and professional than in many neighbouring markets, but context still matters.', e:'Be punctual, specific and well prepared. Make the commercial case, risk position and next steps clear.' },
  'Thailand': { p:'Build rapport and trust before moving quickly to the commercial ask. Harmony is an important part of the relationship.', a:'The Playbook highlights the "Khun" factor: hierarchy can determine who really makes the decision.', c:'High-context communication matters. Greng Jai can lead a partner to say yes or maybe simply to signal they have heard you, not that they agree. Avoid forcing a blunt answer or causing loss of face.', e:'Use a Moment of Pause before committing to a pitch or negotiation. Validate the local context, allow time and make the real commitment explicit.' },
  'Vietnam': { p:'Prioritise relationship and credibility before assuming product fit will carry the deal.', a:'Map hierarchy and identify who has genuine authority, particularly in senior decision-making groups.', c:'Expect greater context and sensitivity to hierarchy than a typical New Zealand or Anglo-Germanic approach. Test meaning rather than relying on literal interpretation.', e:'Build confidence through evidence, process and relationship continuity, then confirm concrete next steps.' }
}

const asia = ['Afghanistan','Armenia','Azerbaijan','Bahrain','Bangladesh','Bhutan','Brunei','Cambodia','China','Cyprus','Georgia','India','Indonesia','Iran','Iraq','Israel','Japan','Jordan','Kazakhstan','Kuwait','Kyrgyzstan','Laos','Lebanon','Malaysia','Maldives','Mongolia','Myanmar','Nepal','North Korea','Oman','Pakistan','Palestine','Philippines','Qatar','Saudi Arabia','Singapore','South Korea','Sri Lanka','Syria','Taiwan','Tajikistan','Thailand','Timor-Leste','Turkey','Turkmenistan','United Arab Emirates','Uzbekistan','Vietnam','Yemen']

export const countries = asia.map(name => ({
  name,
  sourceBacked: Boolean(sourced[name] || countryProfiles[name]),
  ...(sourced[name] || framework),
  ...(countryProfiles[name] || {})
}))

export const frameworkSections = [
  { key:'p', letter:'P', title:'Preparation & Trust', stage:'Discovery', question:'How does this market build credibility?' },
  { key:'a', letter:'A', title:'Alignment of Power', stage:'Pitch & Proposal', question:'Who actually holds authority to buy?' },
  { key:'c', letter:'C', title:'Communication Patterns', stage:'Negotiation', question:'How are objections really expressed?' },
  { key:'e', letter:'E', title:'Execution & Risk', stage:'Closing', question:'What does a binding commitment look like?' }
]
