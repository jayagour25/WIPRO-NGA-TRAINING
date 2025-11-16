import { useCallback } from 'react';

export default function useBookingSubmit(fn) {
  // Custom hook to unify submission logic + error handling
  return useCallback(async (values, helpers) => {
    try {
      await fn(values, helpers);
    } catch (err) {
      console.error('Booking submit error', err);
      if (helpers && helpers.setSubmitting) helpers.setSubmitting(false);
      throw err;
    }
  }, [fn]);
}
