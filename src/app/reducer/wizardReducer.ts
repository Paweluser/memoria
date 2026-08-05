import { DeceasedData, ClientData, CeremonyData } from "../../types/funeralsTypes";

export type WizardState = {
    currentStep: number;
    deceasedData: DeceasedData | null;
    clientData: ClientData | null;
    ceremonyData: CeremonyData | null;
}

export type WizardAction =
    | { type: "next_step"; payload: { stepName: "deceasedData"; data: DeceasedData } }
    | { type: "next_step"; payload: { stepName: "clientData"; data: ClientData } }
    | { type: "next_step"; payload: { stepName: "ceremonyData"; data: CeremonyData } }
    | { type: "prev_step" }

export const initialState: WizardState = {
    currentStep: 1,
    deceasedData: null,
    clientData: null,
    ceremonyData: null
}

export function wizardReducer(state: WizardState, action: WizardAction): WizardState {
    switch (action.type) {
        case "next_step": {
            return {
                ...state,
                [action.payload.stepName]: action.payload.data,
                currentStep: state.currentStep < 3 ? state.currentStep + 1 : state.currentStep
            } as WizardState;
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