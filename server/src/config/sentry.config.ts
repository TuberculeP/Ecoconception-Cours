// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://83d480f54935062de3e9d52acac2f0d1@o4508126771544064.ingest.de.sentry.io/4510911756697680",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});
