function schematify(inputObject, nestedName) {
    const schemaReducer = (prev, [key, value]) => {
        if (key.startsWith(nestedName)) {
            const startChar = key.indexOf('[');
            const endChar = key.indexOf(']');
            const index = key.substring(startChar + 1, endChar);
            const updatedKey = key.substring(endChar + 2);
            if (!prev[nestedName][index]) {
                prev[nestedName][index] = {};
            }
            // if (updatedKey === 'date') {
            //     const day = daysOfWeek[new Date(value).getDay()];
            //     prev[nestedName][index].day = day;
            // }
            prev[nestedName][index][updatedKey] = value;
            return prev;
        }
        prev[key] = value;
        return prev;
    }
    return Object.entries(inputObject).reduce(schemaReducer, { [nestedName]: [] });
}

function deschematify(input, field) {
    const fields = {};
    input[field].forEach((item, i) => {
        Object.entries(item).forEach(([key, value]) => {
            fields[`${field}[${i}].${key}`] = value;
        })
    })
    let { [field]: _, ...rest } = input;
    return Object.assign(rest, fields);
}

export { schematify, deschematify };