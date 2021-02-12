import { format } from 'date-fns';

function Client(props) {
    Object.assign(this, props);
}

Object.defineProperty(Client.prototype, 'bornDate', {
    get: function () {
        return this._bornDate;
    },
    set: function (value) {
        this._bornDate = format(new Date(value), 'dd/MM/yyy');
    },
});

export default Client;
