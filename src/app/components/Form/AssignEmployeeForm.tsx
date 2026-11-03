"use client";

import { useActionState } from "react";
import { assignEmployeeToTeamAction } from "@/actions/teamActions";
import type { SimpleEmployee } from "@/types/employeeTypes";
import { FormError } from "./UI/FormError";
import { SubmitBtn } from "./UI/SubmitBtn";

type AssignEmployeeFormProps = {
  teamId: number;
  employees: SimpleEmployee[];
};

export function AssignEmployeeForm({
  teamId,
  employees,
}: AssignEmployeeFormProps) {
  const action = assignEmployeeToTeamAction.bind(null, teamId);

  const [state, formAction, isPending] = useActionState(action, {
    errors: {},
  });

  if (employees.length === 0) {
    return (
      <p className="mt-8 text-center">
        Brak pracowników bez przypisanego zespołu.
      </p>
    );
  }

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <h2 className="text-xl">Przypisz pracownika</h2>

      {state.errors.general && <FormError>{state.errors.general[0]}</FormError>}

      <div className="flex flex-col gap-2">
        <label htmlFor="employeeId">Pracownik</label>

        <select
          id="employeeId"
          name="employeeId"
          disabled={isPending}
          required
          className="rounded-lg border px-4 py-3"
        >
          <option value="" disabled>
            Wybierz pracownika
          </option>

          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.firstName} {employee.lastName}
            </option>
          ))}
        </select>

        {state.errors.employeeId && (
          <FormError>{state.errors.employeeId[0]}</FormError>
        )}
      </div>

      <SubmitBtn>Przypisz do zespołu</SubmitBtn>
    </form>
  );
}
