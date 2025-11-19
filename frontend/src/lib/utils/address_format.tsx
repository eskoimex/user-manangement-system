// utils/address.ts

import { User } from "types";

/**
 * Format a user's address as "Street, State, City, PostalCode"
 * Truncates the postal code if too long or the full string if needed
 */
export function formatAddress(user: User, maxLength = 40): string {
  if (!user.addresses || user.addresses.length === 0) {
    return "No address";
  }

  const address = user.addresses[0];

  // Optional: truncate postal code if too long
  const postal =
    address.zipcode.length > 6
      ? address.zipcode.slice(0, 6) + "..."
      : address.zipcode;

  let formatted = `${address.street}, ${address.state}, ${address.city}, ${postal}`;

  // Truncate full string if it exceeds maxLength
  if (formatted.length > maxLength) {
    formatted = formatted.slice(0, maxLength - 3) + "...";
  }

  return formatted;
}
