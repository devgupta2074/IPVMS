const registerUser = {
  tags: ["Users"],
  description: "Create a new use in the system",
  operationId: "registerUser",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/registerUserBody",
        },
      },
    },
    required: true,
  },
  responses: {
    201: {
      description: "User created successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true,
              },
              message: {
                type: "string",
                example: "User Registered",
              },
              data: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    example: "60564fcb544047cdc3844818",
                  },
                  first_name: {
                    type: "string",
                    example: "John",
                  },
                  last_name: {
                    type: "string",
                    example: "snow",
                  },
                  created_at: {
                    type: "string",
                    example: "2024-04-16T01:05:55.959Z",
                  },
                  updated_at: {
                    type: "string",
                    example: "2024-04-16T01:05:55.959Z",
                  },
                  email: {
                    type: "string",
                    example: "Tarora@ex2india.com",
                  },
                  is_active: {
                    type: "boolean",
                    example: true,
                  },
                  password_reset: {
                    type: "boolean",
                    example: true,
                  },
                },
              },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Internal Server Error",
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Invalid format",
              },
            },
          },
        },
      },
    },
    409: {
      description: "Conflict",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "User Email Already Exist",
              },
            },
          },
        },
      },
    },
  },
};
const registerUserBody = {
  type: "object",
  properties: {
    firstName: {
      type: "string",
      example: "John",
    },
    lastName: {
      type: "string",
      example: "Snow",
    },
    email: {
      type: "string",
      example: "johnsnow@ex2india.com",
    },
    password: {
      type: "string",
      description: "user's password",
      example: "Hello@12345",
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})",
    },
  },
};
const loginUser = {
  tags: ["Users"],
  description: "Login new User in the system",
  operationId: "loginUser",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/loginUserBody",
        },
      },
    },
    required: true,
  },
  responses: {
    200: {
      description: "User logged in successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true,
              },
              message: {
                type: "string",
                example: "Login Success",
              },
              token: {
                type: "string",
                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
              },
              data: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    example: "60564fcb544047cdc3844818",
                  },
                  first_name: {
                    type: "string",
                    example: "John",
                  },
                  last_name: {
                    type: "string",
                    example: "snow",
                  },
                  created_at: {
                    type: "string",
                    example: "2024-04-16T01:05:55.959Z",
                  },
                  updated_at: {
                    type: "string",
                    example: "2024-04-16T01:05:55.959Z",
                  },
                  email: {
                    type: "string",
                    example: "Tarora@ex2india.com",
                  },
                  is_active: {
                    type: "boolean",
                    example: true,
                  },
                  password_reset: {
                    type: "boolean",
                    example: true,
                  },
                },
              },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Internal Server Error",
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Invalid format",
              },
            },
          },
        },
      },
    },
    404: {
      description: "Not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "user not found",
              },
            },
          },
        },
      },
    },

    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Invalid Credentials",
              },
            },
          },
        },
      },
    },
  },
};
const loginUserBody = {
  type: "object",
  properties: {
    email: {
      type: "string",
      example: "johnsnow@ex2india.com",
    },
    password: {
      type: "string",
      description: "user's password",
      example: "Hello@12345",
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})",
    },
  },
};

export { loginUser, loginUserBody, registerUser, registerUserBody };
