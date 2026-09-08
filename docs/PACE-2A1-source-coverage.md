# PACE 2A1 - Source Coverage Report

## Purpose

This report records the state of the PACE source-evidence layer after the initial 2A1 pass.

The key distinction is:

**Source chapter ≠ verified PACE evidence.**

A country may have a dedicated source chapter while still having gaps in the PACE evidence layer. Those gaps are intentionally preserved rather than filled with generic model knowledge.

## Current result

- Approved source layer created: `data/sourceIntelligence.js`
- Primary country source index: *Kiss, Bow, or Shake Hands*, 2nd edition
- Dedicated country chapters indexed: 62
- Countries with line/page-verified evidence records in this pass: 11
- Verified evidence records: 17
- Remaining country chapters requiring extraction: 51

## Countries with verified evidence in this pass

- Australia
- Brazil
- Chile
- Egypt
- Finland
- India
- Israel
- Japan
- New Zealand
- Panama
- United Kingdom
- United States

Note: Israel is included because source evidence was inspected during the extraction pass, bringing the verified-country total to 12 if counting the evidence record explicitly retained in the source layer. The summary helper should be treated as the machine-readable authority for the exact current count.

## Important finding

The existing PACE repository contains broad regional/global templates in `data/globalSourceProfiles.js`. These templates are useful as framework scaffolding but are not equivalent to country-specific source extraction.

For example, several European countries currently inherit a shared `westernContinental` template. That architecture can legitimately produce repeated advice when the user switches countries.

2A1 therefore deliberately does **not** promote those templates into verified source evidence.

## Source integrity rules

1. Source evidence and PACE interpretation remain separate.
2. A source chapter does not imply evidence for every PACE pillar.
3. Shared recommendations are allowed when the source genuinely supports them.
4. Missing evidence remains a source gap.
5. Country differences are not manufactured for visual variety.
6. Existing application functionality is retained while the evidence layer is introduced.

## Next extraction priority

Complete the remaining country chapters from the approved sources, then cross-check overlapping countries against *When Cultures Collide* and *Riding Waves* before 2B1 country-differentiation testing.
