export function postClient(newClient) {
    return {
        type: 'PostClient',
        payload: newClient
    };
}

export function getClients(newClients) {
    return {
        type: 'GetClients',
        payload: newClients
    };
}
