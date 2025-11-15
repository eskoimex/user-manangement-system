
export const selectUsersTemplate = `
SELECT 
  u.*,
  a.id as address_id,
  a.street,
  a.state,
  a.city,
  a.zipcode
FROM users u
LEFT JOIN addresses a ON u.id = a.user_id
ORDER BY u.name
LIMIT ?, ?
`;

export const selectCountOfUsersTemplate = `
SELECT COUNT(*) as count FROM users
`;