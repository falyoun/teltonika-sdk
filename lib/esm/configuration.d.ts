export interface SwaggerDocsInterface {
    title: string;
    description: string;
    version: string;
    tag?: string;
}
export interface EnvironmentVariables {
    port: number;
    RecaptchaSecretKey: string;
    swaggerDocs: SwaggerDocsInterface;
    db: {
        url: string;
        replicaSet: string;
    };
}
declare const _default: () => EnvironmentVariables;
export default _default;
