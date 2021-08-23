export interface SwaggerDocsInterface {
  title: string;
  description: string;
  version: string;
  tag?: string;
}

export interface EnvironmentVariables {
  port: number;
  RecaptchaSecretKey: string;
  swaggerDocs: SwaggerDocsInterface,
  db: {
    url: string;
    replicaSet: string;
  };
}

export default (): EnvironmentVariables => ({
  port: +process.env.PORT,
  RecaptchaSecretKey: process.env.RecaptchaSecretKey,
  swaggerDocs: {
    title: 'Lamar',
    description: 'Inject botox',
    version: '1.0',
    tag: 'booking',
  },
  db: {
    url: process.env.DATABASE_URL,
    replicaSet: process.env.REPLICA_SET,
  },
});
