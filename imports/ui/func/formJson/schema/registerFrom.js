const schema = {
    "title": "register form",
    "type": "object",
    "required": [
        "firstName",
        "lastName",
        "email",
        "password",
        "confirmPassword",
        "selectWidgetOptions"
    ],
    "properties": {
        "firstName": {
            "type": "string",
            "title": "First name :"
        },
        "lastName": {
            "type": "string",
            "title": "Last name :"
        },
        "email": {
            "type": "string",
            "title": "Email :",
            "format": "email"
        },
        "password": {
            "type": "string",
            "title": "Password :",
            "minLength": 3
        },
        "confirmPassword": {
            "type": "string",
            "title": "Confirm password :",
            "minLength": 3
        },
        "selectWidgetOptions": {
            "title": "Profession",
            "type": "string",
            "enum": [
                "developer",
                "designer",
                "orther"
            ],
            "enumNames": [
                "Developer",
                "Designer",
                "Orther"
            ]
        }
    }
}

export default schema;