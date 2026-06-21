/**
 * User interface representing user profile data in ASRI.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'admin' | 'validator' | 'buyer' | 'seller' | 'driver';
}
