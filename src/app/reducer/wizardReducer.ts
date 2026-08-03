export type WizardState = {
    currentStep: number,
    deceasedData: unknown,
    clientData: unknown,
    ceremonyData: unknown,
}

export type WizardAction =
    | { type: "next_step"; payload: { stepName: "deceasedData" | "clientData" | "ceremonyData"; data: unknown } }
    | { type: "prev_step" }

export function wizardReducer(state: WizardState, action: WizardAction) {
    switch (action.type) {
        case "next_step": {
            return {
                ...state,
                [action.payload.stepName]: action.payload.data,
                currentStep: state.currentStep < 3 ? state.currentStep + 1 : state.currentStep
            }
        }
        case "prev_step": {
            return {
                ...state,
                currentStep: state.currentStep > 1 ? state.currentStep - 1 : 1
            }
        }
        default: {
            throw new Error("Action fail")
        }
    }
}