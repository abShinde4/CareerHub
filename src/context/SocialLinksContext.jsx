import { useEffect, useState } from 'react';
import { SocialLinksContext } from './socialLinksContextValue';
import { getSocialLinks } from '../services/socialLinksService';

const DEFAULT_LINKS = {
  youtube: 'https://www.youtube.com/@ArmanShinde',
  instagram: '',
  linkedin: '',
  telegram: '',
  twitter: '',
  whatsapp: '',
};

export function SocialLinksProvider({ children }) {
  const [links, setLinks] = useState(DEFAULT_LINKS);

  useEffect(() => {
    getSocialLinks()
      .then(({ data }) => setLinks(data.data))
      .catch(() => {});
  }, []);

  return (
    <SocialLinksContext.Provider value={links}>
      {children}
    </SocialLinksContext.Provider>
  );
}
