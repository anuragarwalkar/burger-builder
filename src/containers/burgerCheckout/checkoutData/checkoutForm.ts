export default {
    name: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your Name'
        },
        value: ''
    }, email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Your Email'
        },
        value: ''
    }, street: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your Street'
        },
        value: ''
    },
    postalCode: {
        elementType: 'input',
        elementConfig: {
            type: 'number',
            placeholder: 'Your Postal Code'
        },
        value: 0
    },
    country: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your Country'
        },
        value: ''

    },
    deliveryMethod: {
        elementType: 'select',
        elementConfig: {
            options: [
                { value: 'fastest', displayValue: 'Fastest' },
                { value: 'checpest', displayValue: 'Checpest' },
            ]
        },
        value:'fastest'
    }
}