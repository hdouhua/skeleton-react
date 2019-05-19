declare const DEV_MODE: boolean
declare const SENTRY_DSN: string

/**
 * extend Window object in lib.d.ts
 */
interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: <R>(a: R) => R
}

/**
 * extend Navigator in lib.d.ts
 */
interface Navigator {
  userLanguage: string;
}

/**
 * extend String lib.es5.d.ts
 */
interface String {
  format: any;
}

/**
 * @see {@link https://docs.sentry.io/platforms/javascript/?platform=browsernpm}
 */
declare class Sentry {
  /**
   * config Sentry
   * @param settings please refer to {@link https://docs.sentry.io/error-reporting/configuration/?platform=browsernpm}
   */
  static init: (settings: object) => void

  /**
   * send an Exception to Sentry
   */
  static captureException: (err: Error, extra?: object) => void

  /**
   * send a message to Sentry
   * @param {string} message message
   * @param {string} [level='error'] the severity of the event, the values: fatal, error, warning, info, and debug
   */
  static captureMessage: (message: string, level: string) => void

  static addBreadcrumb: (context: object) => void

  static withScope: (scope: { setExtras: (info: React.ErrorInfo) => void }) => string
}

declare namespace Sentry.Integrations {
  class Breadcrumbs {
    /**
     * breadcrumbs options, please refer to 
     * @link https://github.com/getsentry/sentry-docs/blob/master/src/collections/_documentation/platforms/javascript/index.md#breadcrumbs-1}
     */
    constructor(options: object)
  }

}
