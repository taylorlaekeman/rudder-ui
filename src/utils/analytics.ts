import amplitude from 'amplitude-js';

import settings from 'settings';

amplitude.getInstance().init(settings.ANALYTICS_API_KEY);

function logVisit(): void {
  logEvent('SITE_VISIT');
}

function logEvent(event: string): void {
  if (!settings.featureFlags.IS_REPORTING_METRICS) return;
  amplitude.getInstance().logEvent(event);
}

export default {
  logVisit,
};
