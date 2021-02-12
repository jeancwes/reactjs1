export function postPlan(newPlan) {
    return {
        type: 'PostPlan',
        payload: newPlan
    };
}

export function getPlans(newPlans) {
    return {
        type: 'GetPlans',
        payload: newPlans
    };
}
