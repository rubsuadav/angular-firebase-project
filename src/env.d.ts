interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly NG_APP_FIREBASE_API_KEY: string;
  readonly NG_APP_FIREBASE_AUTH_DOMAIN: string;
  readonly NG_APP_FIREBASE_PROJECT_ID: string;
  readonly NG_APP_FIREBASE_STORAGE_BUCKET: string;
  readonly NG_APP_FIREBASE_MESSAGING_SENDSER_ID: string;
  readonly NG_APP_FIREBASE_APP_ID: string;
  readonly NG_APP_EMAIL_SERVICE_ID: string;
  readonly NG_APP_EMAIL_TEMPLATE_ID: string;
  readonly NG_APP_EMAIL_PUBLIC_KEY: string;
}

/**
 * @deprecated process.env usage
 * prefer using import.meta.env
 * */
declare var process: {
  env: {
    NG_APP_ENV: string;
    [key: string]: any;
  };
};
