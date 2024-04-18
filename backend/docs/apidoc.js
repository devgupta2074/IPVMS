import {
  registerUser,
  registerUserBody,
  loginUser,
  loginUserBody,
  forgotPassword,
  forgotUserBody,
  getAllUsers,
  resetPassword,
  resetUserBody,
  resetAuthUserBody,
  resetPasswordAuth,
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
    "/api/user/getAllUsers": {
      get: getAllUsers,
    },
    "/api/user/forgotPassword": {
      post: forgotPassword,
    },
    "/api/user/resetPassword/{token}": {
      post: resetPassword,
    },
    "/api/user/resetPassword": {
      post: resetPasswordAuth,
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
      forgotUserBody,
      resetUserBody,
      resetAuthUserBody,
    },
  },
};
export { apiDocumentation };
