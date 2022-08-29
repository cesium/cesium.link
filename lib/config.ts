export type Configuration = {
  app: string;
  description: string;
  version: string;
  url: string;
  license: string;
};

export const getVersion = () => ({
  tag: process.env.APP_VERSION,
  env: process.env.NODE_ENV,
  ref: process.env.COMMIT_HASH
});

export const getUrl = () => process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_VERCEL_URL;

export const getAppConfig = () => {
  const { tag, env, ref } = getVersion();

  return {
    app: process.env.APP_NAME,
    description: process.env.APP_DESCRIPTION,
    version: `v${tag}-${env}.${ref.substring(0, 8)}`,
    url: getUrl(),
    license: process.env.APP_LICENSE
  };
};
