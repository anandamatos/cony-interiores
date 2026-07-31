import { useState, useCallback } from 'react';

export const useFeedback = () => {
  const [feedback, setFeedback] = useState(null);

  const showFeedback = useCallback((type, message, title, duration = 5000) => {
    const newFeedback = { type, message, title, duration };
    setFeedback(newFeedback);

    if (duration > 0) {
      setTimeout(() => {
        setFeedback(null);
      }, duration);
    }
  }, []);

  const clearFeedback = useCallback(() => {
    setFeedback(null);
  }, []);

  return {
    feedback,
    showFeedback,
    clearFeedback,
    showSuccess: useCallback((message, title) => {
      showFeedback('success', message, title);
    }, [showFeedback]),
    showError: useCallback((message, title) => {
      showFeedback('error', message, title);
    }, [showFeedback]),
    showWarning: useCallback((message, title) => {
      showFeedback('warning', message, title);
    }, [showFeedback]),
    showInfo: useCallback((message, title) => {
      showFeedback('info', message, title);
    }, [showFeedback]),
  };
};

export default useFeedback;
