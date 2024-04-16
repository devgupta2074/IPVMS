import {
  registerUser,
  registerUserBody,
  loginUser,
  loginUserBody,
} from "./user.js";
const apiDocumentation = {
  openapi: "3.0.1",
  info: {
    version: "1.3.0",
    title: "IPVMS api descriptions",
    description: "Description of api",
    termsOfService: "https://mysite.com/terms",
    contact: {
      name: "Developer name",
      email: "dev@example.com",
      url: "https://devwebsite.com",
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  servers: [
    {
      url: "http://localhost:3000/",
      description: "Local Server",
    },
    {
      url: "https://ipvms-api.exitest.com",
      description: "Production Server",
    },
  ],
  tags: [
    {
      name: "Roles",
    },
    {
      name: "Users",
    },
  ],
  paths: {
    "/api/user/registerUser": {
      post: registerUser,
    },
    "/api/user/loginUser": {
      post: loginUser,
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      registerUserBody,
      loginUserBody,
    },
  },
};
export { apiDocumentation };
