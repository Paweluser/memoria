"use client";

import { useActionState, useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteEmployeeAction } from "@/actions/employeeActions";
import { AppBtn } from "@/app/components/AppBtn";
import { Modal } from "@/app/components/Modal";
import { FormError } from "./UI/FormError";

type DeleteEmployeeFormProps = {
  employeeId: number;
};

export function DeleteEmployeeForm({ employeeId }: DeleteEmployeeFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const action = deleteEmployeeAction.bind(null, employeeId);
  const [state, formAction, isPending] = useActionState(action, { errors: {} });

  return (
    <>
      <button
        type="button"
        title="Usuń konto pracownika"
        onClick={() => setIsOpen(true)}
        className="inline-flex cursor-pointer rounded p-1 hover:text-(--accent-color)"
      >
        <Trash2 className="size-5" />
      </button>

      {isOpen && (
        <Modal
          title="Czy na pewno chcesz usunąć danego pracownika?"
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
