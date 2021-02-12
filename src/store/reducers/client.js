import Client from '../../models/client';

const CLIENTS = [];

const mapClient = client => new Client(client);
const mapClients = clients => clients.map(mapClient);

export function clientReducer (state = CLIENTS, action) {
    switch (action.type) {
        case 'GetClients':
            console.log('GetClients');
            return mapClients(action.payload);
        case 'PostClient':
            console.log('PostClients');
            return [
                ...state,
                mapClient(action.payload)
            ];
        default:
            return state;
    }
}
