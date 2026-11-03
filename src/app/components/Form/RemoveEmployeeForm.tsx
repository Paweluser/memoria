"use client";

import { useActionState } from "react";
import { Trash2 } from "lucide-react";
import { removeEmployeeFromTeamAction } from "@/actions/teamActions";
import { FormError } from "./UI/FormError";

type RemoveEmployeeFormProps = {
  teamId: number;
  employeeId: number;
};

export function RemoveEmployeeForm({
  teamId,
  employeeId,
}: RemoveEmployeeFormProps) {
  const action = removeEmployeeFromTeamAction.bind(null, teamId, employeeId);

  const [state, formAction, isPending] = useActionState(action, {
    errors: {},
  });

  return (
    <form action={formAction} className="flex flex-col items-start gap-2">
      <button
        type="submit"
        disabled={isPending}
        title="Wypisz pracownika z zespołu"
        className="inline-flex cursor-pointer rounded p-1 transition-colors hover:text-(--accent-color) disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Trash2 className="size-5" />
      </button>

      {state.errors.general && (
        <FormError>{state.errors.general[0]}</FormError>
      )}
    </form>
  );
}
