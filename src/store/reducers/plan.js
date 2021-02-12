import Plan from '../../models/plan';

const PLANS = [];

const mapPlan = plan => new Plan(plan);
const mapPlans = plans => plans.map(mapPlan);

export function planReducer (state = PLANS, action) {
    switch (action.type) {
        case 'GetPlans':
            console.log('GetPlans');
            return mapPlans(action.payload);
        case 'PostPlan':
            console.log('PostPlans');
            return [
                ...state,
                mapPlan(action.payload)
            ];
        default:
            return state;
    }
}
