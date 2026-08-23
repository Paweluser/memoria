"use client";

import { useReducer, useState } from "react";
import { initialState, wizardReducer } from "../reducer/wizardReducer";
import { DeceasedForm } from "./Form/DeceasedForm";
import { ClientForm } from "./Form/ClientForm";
import { CeremonyForm } from "./Form/CeremonyForm";
import { CeremonyData, ClientData, DeceasedData } from "@/types/funeralsTypes";
import { useRouter } from "next/navigation";
import { createFuneralAction } from "@/actions/funeralActions";
import { ProgressBar } from "./Form/UI/ProgressBar";
import { Modal } from "./Modal";

export function FuneralWizard() {
  const [state, dispatch] = useReducer(wizardReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    message: string;
  }>({
    isOpen: false,
    type: "success",
    message: "",
  });
  const router = useRouter();

  const handleCloseModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
    if (modal.type === "success") {
      router.push("/dashboard/funerals?page=1");
    }
  };

  return (
    <>
      <ProgressBar step={state.currentStep} />

      {state.currentStep === 1 && (
        <DeceasedForm
          savedData={state.deceasedData}
          onNext={(data: DeceasedData) =>
            dispatch({
              type: "next_step",
              payload: { stepName: "deceasedData", data },
            })
          }
        />
      )}

      {state.currentStep === 2 && (
        <ClientForm
          savedData={state.clientData}
          onNext={(data: ClientData) =>
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
          savedData={state.ceremonyData}
          isPending={isLoading}
          onPrev={() => dispatch({ type: "prev_step" })}
          onNext={async (data: CeremonyData) => {
            dispatch({
              type: "next_step",
              payload: { stepName: "ceremonyData", data },
            });

            const payload = {
              deceased: state.deceasedData,
              client: state.clientData,
              ceremony: data,
            };

            setIsLoading(true);

            try {
              const result = await createFuneralAction(payload);

              if (result.success) {
                setModal({
                  isOpen: true,
                  type: "success",
                  message: result.message || "Pomyślnie dodano pogrzeb.",
                });
              } else {
                setModal({
                  isOpen: true,
                  type: "error",
                  message: result.error || "Wystąpił błąd.",
                });
              }
            } catch (error) {
              console.error(error);
              setModal({
                isOpen: true,
                type: "error",
                message: "Wystąpił nieoczekiwany błąd po stronie serwera.",
              });
            } finally {
              setIsLoading(false);
            }
          }}
        />
      )}

      {modal.isOpen && (
        <Modal
          type={modal.type}
          message={modal.message}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
