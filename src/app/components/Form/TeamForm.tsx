"use client";

import { useActionState } from "react";
import { createTeamAction, updateTeamAction } from "@/actions/teamActions";
import type { SimpleTeam } from "@/types/teamTypes";
import { Input } from "./UI/Input";
import { SubmitBtn } from "./UI/SubmitBtn";
import { FormError } from "./UI/FormError";

type TeamFormProps = {
  team?: SimpleTeam;
};

export function TeamForm({ team }: TeamFormProps) {
  const action = team
    ? updateTeamAction.bind(null, team.id)
    : createTeamAction;

  const [state, formAction] = useActionState(action, {
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

      <div className="flex justify-end pt-4">
        <SubmitBtn>{team ? "Zapisz zmiany" : "Dodaj zespół"}</SubmitBtn>
      </div>
    </form>
  );
}
