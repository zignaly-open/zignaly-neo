import useTitleOriginal, { UseTitleOptions } from 'react-use/lib/useTitle';
import { whitelabel } from '../whitelabel';

export function useTitle(title: string, options?: UseTitleOptions): void {
  useTitleOriginal(
    // instead of fixing all the translations immediately,
    // let's just do this and fix them later
    title.replace(' - Zignaly', '').trim() +
      ' - ' +
      (whitelabel.title || 'Zignaly'),
    options,
  );
}
