import { useContext } from 'react';
import { SocialLinksContext } from './socialLinksContextValue';

export const useSocialLinks = () => useContext(SocialLinksContext) || {};
