"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function () { return ({
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
}); });
