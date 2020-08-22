import amplitude from 'amplitude-js';

import settings from 'settings';

amplitude.getInstance().init(settings.ANALYTICS_API_KEY);

function logVisit(): void {
  logEvent('SITE_VISIT');
}

function logWaitingListSignup(): void {
  logEvent('WAITING_LIST_SIGNUP');
}

function logEvent(event: string): void {
  amplitude.getInstance().logEvent(event);
}

export default {
  logVisit,
  logWaitingListSignup,
};
