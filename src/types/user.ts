/**
 * User interface representing user profile data in ASRI.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'buyer' | 'seller' | 'driver' | 'validator' | 'admin';
  avatar?: string;
}
