"use client";

import { useReducer } from "react";
import { initialState, wizardReducer } from "../reducer/wizardReducer";
import { DeceasedForm } from "./Form/DeceasedForm";
import { ClientForm } from "./Form/ClientForm";
import { CeremonyForm } from "./Form/CeremonyForm";

export function FuneralWizard() {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  return (
    <>
      {state.currentStep === 1 && (
        <DeceasedForm
          onNext={(data) =>
            dispatch({
              type: "next_step",
              payload: { stepName: "deceasedData", data },
            })
          }
        />
      )}

      {state.currentStep === 2 && (
        <ClientForm
          onNext={(data) =>
            dispatch({
              type: "next_step",
              payload: { stepName: "clientData", data },
            })
          }
          onPrev={() => dispatch({ type: "prev_step" })}
        />
      )}

      {state.currentStep === 3 && (
        <CeremonyForm
          onNext={(data) => {
            dispatch({
              type: "next_step",
              payload: { stepName: "ceremonyData", data },
            });
          }}
          onPrev={() => dispatch({ type: "prev_step" })}
        />
      )}
    </>
  )
}
