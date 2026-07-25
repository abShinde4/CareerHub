import { useEffect, useState } from 'react';
import { getAiStatus } from '../services/aiService';

export function useAiStatus() {
  const [aiAvailable, setAiAvailable] = useState(null);
  const [statusMessage, setStatusMessage] = useState('Checking AI service...');

  useEffect(() => {
    let cancelled = false;

    getAiStatus()
      .then(({ data }) => {
        if (cancelled) return;
        const available = Boolean(data?.available);
        setAiAvailable(available);
        setStatusMessage(available ? 'AI Service Ready' : 'AI Service unavailable');
      })
      .catch(() => {
        if (cancelled) return;
        setAiAvailable(false);
        setStatusMessage('AI Service unavailable');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    aiAvailable: aiAvailable === true,
    aiUnavailable: aiAvailable === false,
    statusLoading: aiAvailable === null,
    statusMessage,
  };
}
