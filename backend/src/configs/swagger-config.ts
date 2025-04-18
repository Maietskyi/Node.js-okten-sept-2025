import { OpenAPIV3 } from "openapi-types";
import swaggerUI from "swagger-ui-express";

const swaggerDocument: OpenAPIV3.Document = {
    openapi: "3.0.0",
    info: {
        title: "Pizza API Documentation",
        version: "1.0.0",
        description: "API Documentation for Pizza Shop",
    },
    servers: [
        {
            url: "https://localhost:5555",
            description: "Local server",
        },
    ],
    tags: [
        {
            name: "Auth",
            description: "Authentication endpoint",
        },
        {
            name: "Pizza",
            description: "Pizza endpoints",
        },
    ],
    paths: {},
};

export {
    swaggerDocument,
    swaggerUI,
};