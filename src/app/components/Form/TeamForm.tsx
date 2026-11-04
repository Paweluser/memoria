"use client";

import { useActionState } from "react";
import { createTeamAction, updateTeamAction } from "@/actions/teamActions";
import { SimpleTeam } from "@/types/teamTypes";
import { SimpleEmployee } from "@/types/employeeTypes";
import { Input } from "./UI/Input";
import { SubmitBtn } from "./UI/SubmitBtn";
import { FormError } from "./UI/FormError";

type TeamFormProps = {
  team?: SimpleTeam;
  employees?: SimpleEmployee[];
};

export function TeamForm({ team, employees = [] }: TeamFormProps) {
  const action = team
    ? updateTeamAction.bind(null, team.id)
    : createTeamAction;

  const [state, formAction, isPending] = useActionState(action, {
    errors: {},
  });

  return (
    <form action={formAction} className="mt-8 flex w-full flex-col space-y-6">
      <h2 className="border-b pb-2 text-xl">
        {team ? "Edycja zespołu" : "Nowy zespół"}
      </h2>

      {state?.errors?.general && (
        <FormError>{state.errors.general[0]}</FormError>
      )}

      <Input
        label="Nazwa zespołu"
        inputAttribute="teamName"
        type="text"
        defaultValue={team?.teamName ?? ""}
      />
      {state?.errors?.teamName && (
        <FormError>{state.errors.teamName[0]}</FormError>
      )}

      {!team && (
        <fieldset disabled={isPending} className="space-y-3">
          <legend className="mb-2 font-medium">
            Pracownicy — opcjonalnie
          </legend>

          {employees.length > 0 ? (
            employees.map((employee) => (
              <label key={employee.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="employeeIds"
                  value={employee.id}
                />
                {employee.firstName} {employee.lastName}
              </label>
            ))
          ) : (
            <p>Brak pracowników bez zespołu. Możesz utworzyć pusty zespół.</p>
          )}
        </fieldset>
      )}

      <div className="flex justify-end pt-4">
        <SubmitBtn>{team ? "Zapisz zmiany" : "Dodaj zespół"}</SubmitBtn>
      </div>
    </form>
  );
}
