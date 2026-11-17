"use client";

import { useActionState, useState } from "react";
import { deleteFuneralAction } from "@/actions/funeralActions";
import { AppBtn } from "@/app/components/AppBtn";
import { Modal } from "@/app/components/Modal";
import { FormError } from "./UI/FormError";

type DeleteFuneralFormProps = {
  funeralId: number;
};

export function DeleteFuneralForm({ funeralId }: DeleteFuneralFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const action = deleteFuneralAction.bind(null, funeralId);
  const [state, formAction, isPending] = useActionState(action, { errors: {} });

  return (
    <>
      <AppBtn onClick={() => setIsOpen(true)}>Usuń</AppBtn>

      {isOpen && (
        <Modal
          title="Czy na pewno chcesz usunąć dany pogrzeb?"
          onClose={() => setIsOpen(false)}
          isPending={isPending}
        >
          <form action={formAction} className="space-y-4">
            {state.errors.general && (
              <div role="alert">
                <FormError>{state.errors.general[0]}</FormError>
              </div>
            )}

            <div className="flex flex-wrap justify-end gap-4">
              <AppBtn
                disabled={isPending}
                onClick={() => setIsOpen(false)}
              >
                Anuluj
              </AppBtn>

              <button
                type="submit"
                disabled={isPending}
                className="cursor-pointer rounded-lg bg-(--second-color) px-6 py-3 text-(--main-color) transition-colors hover:bg-(--accent-color) disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? "Usuwanie..." : "Usuń"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
