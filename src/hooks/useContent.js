import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Til o'zgarganda ma'lumotni qayta yuklaydi, eskisini yangisi kelguncha saqlab turadi
export function useContent(fetcher) {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage;
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    fetcher(lang)
      .then((data) => !cancelled && setState({ data, loading: false, error: null }))
      .catch((error) => !cancelled && setState((prev) => ({ ...prev, loading: false, error })));

    return () => {
      cancelled = true;
    };
  }, [fetcher, lang, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { ...state, lang, retry };
}
