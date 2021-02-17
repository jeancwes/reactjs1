import { format, isAfter, isEqual, parseISO } from 'date-fns';
import * as Yup from 'yup';

function Plan(props) {
    Object.assign(this, props);
}

Plan.prototype = {
    endEffectiveDateLabel: function () {
        return format(new Date(this.endEffectiveDate), 'dd/MM/yyyy');
    },

    permitLegalPersonLabel: function () {
        return this.permitLegalPerson ? 'Sim' : 'Não';
    },

    startEffectiveDateLabel: function () {
        return format(new Date(this.startEffectiveDate), 'dd/MM/yyyy');
    },

    isEndEffectiveDateValid: function () {
        var now = new Date(Date.now()).setHours(0, 0, 0, 0);
        return isEqual(parseISO(this.endEffectiveDate).setHours(0, 0, 0, 0), now) ||
            isAfter(parseISO(this.endEffectiveDate).setHours(0, 0, 0, 0), now);
    },
}

export default Plan;

export const planValidationSchema = Yup.object()
    .shape({
        name: Yup.string()
            .min(3, 'Campo deve ter no mínimo 3 caracteres')
            .max(100, 'Campo deve ter no máximo 100 caracteres')
            .required('Campo requerido'),
        permitLegalPerson: Yup.string()
            .required('Campo requerido'),
        startEffectiveDate: Yup.string()
            .required('Campo requerido'),
        endEffectiveDate: Yup.string()
            .required('Campo requerido'),
    });

export const planInitialValues = {
    name: '',
    permitLegalPerson: false,
    startEffectiveDate: '',
    endEffectiveDate: '',
};
