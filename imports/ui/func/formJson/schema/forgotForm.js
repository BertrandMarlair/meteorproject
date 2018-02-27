const schema = {
    "title": "login form",
    "type": "object",
    "required": [
        "email",
    ],
    "properties": {
        "email": {
            "type": "string",
            "title": "Email :",
            "format": "email"
        }
    }
}

export default schema;