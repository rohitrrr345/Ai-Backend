export const calculateRuleScore = (lead, offer) => {
  let score = 0;

  // Role relevance
  const role = lead.role?.toLowerCase();
  if (role.includes("head") || role.includes("founder") || role.includes("director")) score += 20;
  else if (role.includes("manager") || role.includes("lead")) score += 10;

  // Industry match
  const industry = lead.industry?.toLowerCase();
  if (offer.ideal_use_cases.some(i => industry.includes(i.toLowerCase()))) score += 20;
  else if (offer.name.toLowerCase().includes(industry)) score += 10;

  // Data completeness
  const fields = ["name", "role", "company", "industry", "location", "linkedin_bio"];
  const allPresent = fields.every(f => lead[f]);
  if (allPresent) score += 10;

  return score;
};

