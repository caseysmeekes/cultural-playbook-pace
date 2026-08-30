const linearActive = {
  p:'Establish credibility through preparation, competence, clear objectives and evidence. Get to the commercial purpose without making relationship-building performative.',
  a:'Decision authority is generally easier to identify than in highly consensus-oriented cultures, but still map the buyer, influencers and approval path rather than assuming the room is the whole decision.',
  c:'Clarity, logic and explicit language are valuable. State the issue, evidence and recommendation, while adapting humour, challenge and formality to the specific market.',
  e:'Define the decision, evidence, owner and next step clearly. A strong close is one that leaves little ambiguity about what happens next.'
}
const consensusNordic = {
  p:'Credibility is strengthened by preparation, competence, modesty and reliability. Avoid over-selling yourself or the proposition.',
  a:'Expect relatively distributed authority and stakeholder involvement. Map the people who need to be comfortable rather than relying on one senior sponsor.',
  c:'Prefer concise, calm and low-drama communication. Allow space for considered responses and do not mistake limited emotional display for lack of interest.',
  e:'Make the evidence, process and responsibilities transparent. Build enough internal agreement before expecting a rapid commitment.'
}
const westernContinental = {
  p:'Prepare thoroughly and demonstrate competence. Credibility often comes from the quality and precision of the substance, not from aggressive selling.',
  a:'Map formal authority and the specialist stakeholders who influence the decision. Expertise can carry significant weight.',
  c:'Use structured, substantive communication. Adapt the amount of detail and the degree of directness to the market rather than using one European style everywhere.',
  e:'Make the proposal technically, commercially and procedurally defensible. Clear evidence and sound process reduce uncertainty.'
}
const latin = {
  p:'Relationship, warmth and personal credibility can be part of the commercial process. Allow time to know the people as well as the proposal.',
  a:'Map formal authority alongside personal and relationship influence. The person with the title may not be the only person who shapes the outcome.',
  c:'Expect more discussion, context and relationship-building than a purely linear meeting style. Do not confuse conversational warmth with a final commitment.',
  e:'Keep the commercial objective clear while allowing for discussion and relationship. Confirm concrete next steps rather than relying on a friendly conversation as agreement.'
}
const centralAmerica = {
  p:'Build credibility through friendly social relationships, personal trust and demonstrated reliability. Relationship quality can influence whether the commercial conversation progresses.',
  a:'Identify accessible decision-makers as well as the personal networks that influence them. Do not assume the formal chart tells the whole story.',
  c:'Allow room for discussion and personal connection. Avoid reducing the interaction to a purely technical exchange.',
  e:'Confirm price, service, ownership and follow-up explicitly. Reputation and after-sales support can matter as much as the initial pitch.'
}
const arab = {
  p:'Build credibility through hospitality, respect, relationship continuity and demonstrated reliability before pushing hard for the transaction.',
  a:'Map senior authority, trusted relationships and institutional stakeholders. Senior sponsorship can matter greatly.',
  c:'Use respectful, tactful and face-aware communication. Avoid public embarrassment and allow room for relationship-preserving disagreement.',
  e:'Be clear about approvals, responsibilities, documentation and follow-up while maintaining the relationship. Do not confuse hospitality with commitment.'
}
const easternEurope = {
  p:'Establish credibility through competence, reliability and a clear understanding of the problem. Trust may develop through demonstrated substance rather than instant familiarity.',
  a:'Map formal hierarchy and influential stakeholders. Seniority and expertise can both matter.',
  c:'Use respectful, substantive communication. Avoid rushing conclusions and watch for measured or indirect disagreement.',
  e:'Support the decision with evidence, procedures and clear commitments. Confirm timing and ownership rather than assuming verbal agreement is final.'
}
const baltic = {
  p:'Preparation, competence and reliable follow-through establish credibility. Concise, factual information is useful.',
  a:'Map the formal decision structure, but expect practical expertise to influence the outcome.',
  c:'Keep communication concise and allow pauses. Limited feedback or emotional display should not automatically be read as disinterest.',
  e:'Use facts, figures and clear commitments. Confirm responsibilities and deliver what was promised.'
}
const ukraine = {
  p:'Build credibility through preparation, facts and genuine personal engagement. Be ready for strong views and do not rely on polished generalities alone.',
  a:'Expect individual agency and strong personal viewpoints. Identify the person who can actually decide rather than assuming group consensus.',
  c:'Discussion can be open and direct, with emotion and personal interpretation influencing how information is received. Be respectful but do not be afraid of substantive discussion.',
  e:'Use objective evidence, clear ownership and explicit next steps, while recognising that personal judgement can still shape the outcome.'
}
const belarus = {
  p:'Reliability, practical substance and stability can be important to credibility. Establish trust carefully and avoid unnecessary pressure.',
  a:'Formal leadership and strong individual authority can matter. Map the leader, operational stakeholders and trusted relationships.',
  c:'Use practical, specific communication and do not assume abstract claims will carry the discussion. Confirm what the counterpart actually believes and needs.',
  e:'Make commitments, responsibilities and practical evidence explicit. Stability and predictability can reduce uncertainty.'
}
const arabCountryNotes = {
  'Algeria':'Hospitality, relationship and respect matter. Be mindful of religious and historical sensitivities and avoid forcing a purely transactional rhythm.',
  'Egypt':'Continuity, tradition and relationship are important contextual factors. Allow time for rapport and avoid assuming a Western meeting rhythm.',
  'Jordan':'Hospitality, stability and relationship are useful foundations. Build trust before moving into hard commercial pressure.',
  'Kuwait':'Senior authority and established relationships matter. Be patient around approvals and precise about documentation and follow-up.',
  'Lebanon':'Relationship and personal credibility can matter strongly. Allow room for discussion and avoid reducing the interaction to price alone.',
  'Libya':'Use careful relationship-led engagement and respect formal authority. Allow additional time for trust and process.',
  'Mauritania':'Relationship, hospitality and respect are important. Work patiently through trusted channels and formal authority.',
  'Morocco':'Relationship, hospitality and respect are important alongside commercial substance. Avoid treating the market as interchangeable with Europe or the Gulf.',
  'Oman':'Hospitality, relationship continuity and formal authority matter. Patience and reliability are useful commercial signals.',
  'Qatar':'Senior sponsorship and institutional relationships can matter. Be clear, respectful and patient around approvals.',
  'Saudi Arabia':'Hospitality, senior authority and relationship continuity are central considerations. Establish trust before hard bargaining.',
  'Sudan':'Relationship, hospitality and trust are important. Work patiently through trusted relationships and clarify commitments carefully.',
  'Syria':'Use careful relationship-led engagement, respect formal authority and avoid assuming that a standard Western sales rhythm will transfer unchanged.',
  'Tunisia':'Relationship and respect matter, while French influence can shape some business interactions. Adapt rather than assuming one regional template.',
  'United Arab Emirates':'Combine relationship awareness with commercial professionalism. Map senior sponsorship and institutional approvals carefully.',
  'West Bank and Gaza':'Approach with empathy, respect and awareness of local context. Avoid political assumptions and focus on the specific people and organisation in front of you.',
  'Yemen':'Relationship, hospitality and formal authority matter. Use patience, trusted channels and careful confirmation of commitments.'
}
const profiles = {}
const add = (names, template, basis='When Cultures Collide country chapter') => names.forEach(name => { profiles[name] = { basis, ...template } })

add(['United States','Canada','Britain','Ireland','Australia','New Zealand'], linearActive)
add(['South Africa'], { ...latin, c:'Communication can be varied across a highly diverse society. Avoid assuming one South African style; adapt to the individual, organisation and context.', a:'Map formal authority and the diverse stakeholder environment carefully.', p:'Credibility comes from competence, respect and genuine engagement. Avoid treating the market as culturally uniform.', e:'Make commitments, responsibilities and next steps explicit.' })
add(['Germany','Austria','Switzerland','Netherlands','Belgium','France'], westernContinental)
add(['Italy','Spain','Portugal','Greece'], latin)
add(['Poland','Hungary','Czech Republic','Slovakia','Slovenia','Croatia','Serbia and Montenegro','Bulgaria','Romania'], easternEurope)
add(['Finland','Sweden','Norway','Denmark'], consensusNordic)
add(['Estonia','Latvia','Lithuania'], baltic)
add(['Russia'], { ...easternEurope, p:'Credibility benefits from expertise, authority and personal trust. Be prepared for scepticism and demonstrate that you understand the subject rather than relying on polished generalities.', c:'Communication may be cautious and information-focused. Personal empathy and demonstrated authority can matter; do not mistake scepticism for disengagement.', e:'Be precise about authority, evidence, legal/process requirements and who can commit.' })
add(['Turkey','Iran'], { ...arab, p:'Build personal credibility and relationship capital before pushing hard on the transaction. Respect local history, identity and formal status.', c:'Use respectful, relationship-aware communication. Allow room for discussion and avoid unnecessary public confrontation.', e:'Clarify commercial terms, authority and next steps while protecting the relationship.' })
Object.entries(arabCountryNotes).forEach(([name,note]) => { profiles[name] = { basis:'When Cultures Collide Arab-country chapter', ...arab, p:note } })
add(['Iraq','Israel'], { ...easternEurope, p:'Establish credibility through expertise, preparedness and personal trust. Be attentive to history, identity and the specific organisational context.', c:'Expect active questioning and strong viewpoints in some settings. Treat challenge as information to interpret rather than automatically as hostility.', e:'Be precise about evidence, authority, implementation and next steps.' })
add(['Argentina','Mexico','Brazil','Chile','Venezuela','Colombia'], latin)
add(['Costa Rica','Ecuador','Guatemala','Honduras','Panama','Paraguay','Peru'], centralAmerica, 'Kiss, Bow, or Shake Hands country chapter')
add(['Uruguay'], { ...latin, p:'Personal credibility, sophisticated preparation and relationship quality can support trust. Sport and food can provide natural openings.', a:'Map the decision-maker and influential relationships, while recognising that executives may have substantial international experience.', c:'Warm, relationship-aware discussion is useful. Keep commercial content clear without making the interaction overly transactional.', e:'Confirm the commercial next step clearly and distinguish social hospitality from actual commitment.' }, 'Kiss, Bow, or Shake Hands country chapter')
add(['Ukraine'], ukraine, 'Kiss, Bow, or Shake Hands country chapter')
add(['Belarus'], belarus, 'Kiss, Bow, or Shake Hands country chapter')
add(['Hong Kong'], { p:'Professional credibility, commercial competence and relationship quality matter. Be prepared for a fast-moving, internationally oriented business environment.', a:'Map both formal authority and influential networks. Commercial expertise can be highly visible in decision-making.', c:'Communication can be commercially direct while remaining context-aware. Be precise and responsive.', e:'Move from discussion to clear commercial terms, responsibilities and timing when alignment is reached.' }, 'When Cultures Collide China and Hong Kong chapter')

export const globalSourceProfiles = profiles
