import { format } from 'date-fns';
import * as Yup from 'yup';

function Client(props) {
    Object.assign(this, props);
    this.plansAssign(props.plans);
}

Client.prototype = {
    bornDateLabel: function () {
        return format(new Date(this.bornDate), 'dd/MM/yyyy');
    },

    plansAssign: function (values) {
        if (!Array.isArray(values)) return;

        this.plans = values.map(function (value) {
            if (typeof value == ('object')) {
                return value;
            }
            return { planId: value };
        });
    },
}

export default Client;

const requiredLegalPerson = function (v) {
    if (!this.parent.cpfCnpj) {
        return false;
    }
    if (!v && this.parent.cpfCnpj.length === 14) {
        return true;
    }
    if (this.parent.cpfCnpj.length === 11 && (v && v.length > 0)) {
        return true;
    }
    return false;
};

export const clientValidationSchema = Yup.object()
    .shape({
        name: Yup.string()
            .min(3, 'Campo deve ter no mínimo 3 caracteres')
            .max(100, 'Campo deve ter no máximo 100 caracteres')
            .required('Campo requerido'),
        cpfCnpj: Yup.string()
            .test('length', 'Campo deve ter 11 ou 14 caracteres',
                v => v && (v.length === 11 || v.length === 14))
            .matches(/^[0-9]*$/, "Campo só deve possuir números")
            .required('Campo requerido'),
        rg: Yup.string()
            .test('required', 'Campo requerido', requiredLegalPerson),
        bornDate: Yup.string()
            .required('Campo requerido'),
        phone: Yup.string()
            .test('length', 'Campo deve ter 10 ou 11 caracteres',
                v => v && (v.length === 10 || v.length === 11))
            .matches(/^[0-9]*$/, "Campo só deve possuir números")
            .required('Campo requerido'),
        email: Yup.string()
            .email('Campo deve possuir um formato de email válido')
            .required('Campo requerido'),
    });

export const clientInitialValues = {
    name: '',
    cpfCnpj: '',
    rg: '',
    bornDate: new Date(),
    phone: '',
    email: '',
    plans: [],
};
