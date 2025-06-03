export const errorMessages: Record<string, string> = {
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/user-disabled': 'Your account has been disabled. Contact support.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/invalid-credential': 'The provided credentials are invalid.',
  'auth/email-already-in-use': 'This email is already registered.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/network-request-failed': 'Network error. Please check your connection.',
  'auth/missing-password': 'Please enter your password.',
  'auth/missing-email': 'Please enter your email address.',
  'auth/operation-not-allowed': 'This operation is not allowed.',
  'auth/internal-error': 'An internal error occurred. Please try again.',
};

export function extractCodeFromMessage(message: string) {
  const match = message.match(/auth\/[a-z-]+/);
  return match ? match[0] : '';
}
