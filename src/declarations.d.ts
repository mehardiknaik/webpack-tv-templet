declare module '*.css' {
  const content: { [className: string]: string };
  export = content;
}

/**
 * Module declaration for image files.
 * Allows importing images as modules.
 */
declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';

/**
 * Global variable.
 * Public path for Webpack.
 * This is set by Webpack at build time.
 */
declare const __webpack_public_path__: string;

/**
 * Global variable.
 * True when in development mode.
 */
declare const __DEV__: boolean;

/**
 * Global variable.
 * True when in production mode.
 */
declare const __PROD__: boolean;

/**
 * Global variable.
 * Build date in ISO format.
 */
declare const __BUILD_DATE__: string;

/**
 * Global variable.
 * Platform for which the build is made.
 */
declare const __PLATFORM__: 'web' | 'tizen' | 'webos';

interface Window {
  /**
   * Global environment variables.
   * This object is access from window context.
   */
  __env: {
    /**
     * Application name.
     */
    NAME?: string;
  };
}
