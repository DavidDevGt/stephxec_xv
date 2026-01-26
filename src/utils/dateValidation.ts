/**
 * Validates that a date is in the future
 * @param date - The date to validate
 * @returns true if date is valid and in the future, false otherwise
 */
export const isValidFutureDate = (date: Date): boolean => {
  try {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error('Invalid date object provided to isValidFutureDate');
      return false;
    }

    const now = new Date();
    const isFuture = date.getTime() > now.getTime();

    if (!isFuture) {
      console.warn('Event date is in the past:', date);
    }

    return isFuture;
  } catch (error) {
    console.error('Error validating event date:', error);
    return false;
  }
};

/**
 * Validates event details object structure
 * @param eventDetails - The event details to validate
 * @returns true if valid, false otherwise
 */
export const validateEventDetails = (eventDetails: any): boolean => {
  try {
    // Check required fields
    if (!eventDetails || typeof eventDetails !== 'object') {
      console.error('Event details must be an object');
      return false;
    }

    if (!eventDetails.date || !isValidFutureDate(eventDetails.date)) {
      console.error('Event date is missing or invalid');
      return false;
    }

    if (!eventDetails.name || typeof eventDetails.name !== 'string') {
      console.error('Event name is required');
      return false;
    }

    if (!eventDetails.address || typeof eventDetails.address !== 'string') {
      console.error('Event address is required');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error validating event details:', error);
    return false;
  }
};
