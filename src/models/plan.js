import { format } from 'date-fns';

function Plan(props) {
    Object.assign(this, props);
}

Plan.prototype = {
    permitLegalPersonLabel: function () {
        return this.permitLegalPerson ? 'Sim' : 'Não';
    }
}

Object.defineProperty(Plan.prototype, 'startEffectiveDate', {
    get: function () {
        return this._startEffectiveDate;
    },
    set: function (value) {
        this._startEffectiveDate = format(new Date(value), 'dd/MM/yyy');
    },
});

Object.defineProperty(Plan.prototype, 'endEffectiveDate', {
    get: function () {
        return this._endEffectiveDate;
    },
    set: function (value) {
        this._endEffectiveDate = format(new Date(value), 'dd/MM/yyy');
    },
});

export default Plan;
