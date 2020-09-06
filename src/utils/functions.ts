export const cloneState = (state: any) => {
    return JSON.parse(JSON.stringify(state))
}