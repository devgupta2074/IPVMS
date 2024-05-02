const createNewCategory = {
    tags: ["Category"],
    description: "Create a new category in the system",
    operationId: "createNewCategory",
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/registerCategoryBody",
                },
            },
        },
        required: true,
    },
    responses: {
        201: {
            description: "Category created successfully!",
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
                                example: "Category Registered",
                            },
                            data: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "number",
                                        example: "980765",
                                    },
                                    category: {
                                        type: "string",
                                        example: "IT",
                                    },
                                    created_at: {
                                        type: "string",
                                        example: "2024-04-16T01:05:55.959Z",
                                    },
                                    is_active: {
                                        type: "boolean",
                                        example: true,
                                    },
                                    svg: {
                                        type: "string",
                                        example: null,
                                    },
                                    color: {
                                        type: 'string',
                                        example: null
                                    }
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
                            success: {
                                type: "boolean",
                                example: false,
                            },
                            message: {
                                type: "string",
                                example: "Error in creating Category",
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
                            success: {
                                type: "boolean",
                                example: false,
                            },
                            message: {
                                type: "string",
                                example: "Category already Exists",
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
                                example: "Category Already Exist",
                            },
                        },
                    },
                },
            },
        },
    },
};


const registerCategoryBody = {
    type: "object",
    properties: {
        category: {
            type: "string",
            example: "IT",
        },
    },
};

const getAllCategories = {
    tags: ["Category"],
    description: "Get All Categories in the system",
    operationId: "getAllCategories",
    security: [
        {
            bearerAuth: [],
        },
    ],
    responses: {
        200: {
            description: "Get All Categories Succeess",
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
                                example: "All Categories are :",
                            },
                            length: {
                                type: "number",
                                example: 8

                            },
                            data: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id: {
                                            type: "number",
                                            example: "4818",
                                        },
                                        category: {
                                            type: "string",
                                            example: "IT",
                                        },
                                        created_at: {
                                            type: "string",
                                            example: "2024-04-16T01:05:55.959Z",
                                        },
                                        is_active: {
                                            type: "boolean",
                                            example: true,
                                        },
                                        svg: {
                                            type: "string",
                                            example: '',
                                        },
                                        color: {
                                            type: "sting",
                                            example: '#0C3D99',
                                        }

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
                            success: {
                                type: "boolean",
                                example: false,
                            },
                            message: {
                                type: "string",
                                example: "Internal Server Error",
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
                                example: "No categories exists.",
                            },
                        },
                    },
                },
            },
        },
    },
};

const editCategory = {

    tags: ["Category"],
    description: "Editing name of category.",
    operationId: "editCategory",
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/editCategoryBody",
                },
            },
        },
        required: true,
    },
    responses: {
        200: {
            description: "Editing name of category Success",
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
                                example: "Updated category:",
                            },
                            length: {
                                type: "number",
                                example: 1
                            },
                            data: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "number",
                                        example: 818,
                                    },
                                    category: {
                                        type: "string",
                                        example: "IT",
                                    },
                                    created_at: {
                                        type: "string",
                                        example: "2024-04-16T01:05:55.959Z",
                                    },
                                    is_active: {
                                        type: "boolean",
                                        example: true,
                                    },
                                    svg: {
                                        type: "string",
                                        example: "",
                                    },
                                    color: {
                                        type: "string",
                                        example: "#987hj"
                                    }
                                },
                            },
                        },
                    },
                },
            },
        },
        500: {
            description: "Database Error",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "Error in reseting user password",
                            },
                        },
                    },
                },
            },
        },
        400: {
            description: "Validation Error",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "Error in reseting User password",
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
    },

};


export {
    createNewCategory,
    registerCategoryBody,
    getAllCategories,
    editCategory,

};