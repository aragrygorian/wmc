export const progressiveClaimLineModule = {
  sk: 'slug',
  table: {
    name: 'progressive_claim_line',
  },
  name: {
    singular: 'Progressive Claim Line',
    plural: 'Progressive Claim Lines',
  },
  select: {
    list: '*, progressive_claim(*), product(*)',
    detail: '*, progressive_claim(*)',
  },
}
