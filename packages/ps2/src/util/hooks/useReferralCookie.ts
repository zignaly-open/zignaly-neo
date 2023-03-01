import Cookies from 'js-cookie';

/**
 * Save ref in cookies
 */
const useReferralCookie = () => {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('invite');
  const subtrack = params.get('subtrack');
  if (ref) {
    Cookies.set('ref', subtrack ? `${ref}:${subtrack}` : ref);
  }
};

export default useReferralCookie;
