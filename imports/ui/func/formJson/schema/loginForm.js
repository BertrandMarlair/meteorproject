const schema = {
    "title": "login form",
    "type": "object",
    "required": [
        "email",
        "password",
    ],
    "properties": {
        "email": {
            "type": "string",
            "title": "Email :",
            "format": "email"
        },
        "password": {
            "type": "string",
            "title": "Password :",
            "minLength": 3
        }
    }
}

export default schema;