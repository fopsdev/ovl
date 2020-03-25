/* make sure you export all the necessary table functions using the correct namespace (same as in tableDef - state) */

// import * as translation from "./views/Translation/functions"
// export { translation }

import * as tabletesting from "./shared/TableTesting/functions"
import * as mobiletimerecording from "./screens/MobileTimeRecording/functions"
export { tabletesting, mobiletimerecording }
