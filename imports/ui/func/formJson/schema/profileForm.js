const schema = {
    "title": "register form",
    "type": "object",
    "required": [
        "firstName",
        "lastName",
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