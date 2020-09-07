export const cloneState = (state: any) => {
    return JSON.parse(JSON.stringify(state))
}

export const convertFormToArray = (form: any) => {
    const formElements: any = [];

    for (const key in form) {
        formElements.push({
            id: key,
            config: form[key]
        });
    }

    return formElements;
}

type rulesType = { required: boolean, minLength: number, maxLength: number };

export const checkValidity = (value: string, rules: rulesType): boolean => {
    let isValid = true;

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    return isValid;
}

export const updateObject = (state: any, updateObject: any) => {
    return {
        ...cloneState(state),
        ...updateObject
    }
}