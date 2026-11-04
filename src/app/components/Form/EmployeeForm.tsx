"use client";

import { useActionState } from "react";
import { Input } from "./UI/Input";
import { SubmitBtn } from "./UI/SubmitBtn";
import { FormError } from "./UI/FormError";
import {
  createEmployeeAction,
  updateEmployeeAction,
} from "@/actions/employeeActions";
import type { SimpleTeam } from "@/types/teamTypes";
import type { EmployeeData } from "@/types/employeeTypes";

type EmployeeFormProps = {
  teams: SimpleTeam[];
  employee?: Pick<EmployeeData, "id" | "firstName" | "lastName" | "email">;
};

export function EmployeeForm({ teams, employee }: EmployeeFormProps) {
  const action = employee
    ? updateEmployeeAction.bind(null, employee.id)
    : createEmployeeAction;

  const [state, formAction] = useActionState(action, {
    errors: {},
  });

  return (
    <form action={formAction} className="mt-8 flex w-full flex-col space-y-6">
      <h2 className="border-b pb-2 text-xl">
        {employee ? "Edycja pracownika" : "Nowy pracownik"}
      </h2>

      {state?.errors?.general && (
        <FormError>{state.errors.general[0]}</FormError>
      )}

      <Input
        label="Imię"
        inputAttribute="firstName"
        type="text"
        defaultValue={employee?.firstName ?? ""}
      />
      {state?.errors?.firstName && (
        <FormError>{state.errors.firstName[0]}</FormError>
      )}

      <Input
        label="Nazwisko"
        inputAttribute="lastName"
        type="text"
        defaultValue={employee?.lastName ?? ""}
      />
      {state?.errors?.lastName && (
        <FormError>{state.errors.lastName[0]}</FormError>
      )}

      <Input
        label="Adres e-mail"
        inputAttribute="email"
        type="email"
        defaultValue={employee?.email ?? ""}
      />
      {state?.errors?.email && <FormError>{state.errors.email[0]}</FormError>}

      {!employee && (
        <>
          <Input label="Hasło startowe" inputAttribute="password" type="password" />
          {state?.errors?.password && (
            <FormError>{state.errors.password[0]}</FormError>
          )}

          <div className="flex flex-col">
            <label htmlFor="role" className="mb-1 text-sm font-medium">
              Rola w systemie
            </label>
            <select
              name="role"
              id="role"
              defaultValue="EMPLOYEE"
              className="rounded-md border p-2 text-sm shadow-sm focus:border-(--second-color) focus:ring-1 focus:ring-(--second-color) focus:outline-none"
            >
              <option value="EMPLOYEE">Pracownik</option>
              <option value="MANAGER">Kierownik</option>
              <option value="ADMIN">Administrator</option>
            </select>
            {state?.errors?.role && <FormError>{state.errors.role[0]}</FormError>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="teamId" className="mb-1 text-sm font-medium">
              Zespół
            </label>
            <select
              name="teamId"
              id="teamId"
              className="rounded-md border p-2 text-sm shadow-sm focus:border-(--second-color) focus:ring-1 focus:ring-(--second-color) focus:outline-none"
            >
              <option value="">Bez zespołu</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.teamName}
                </option>
              ))}
            </select>
            {state?.errors?.teamId && (
              <FormError>{state.errors.teamId[0]}</FormError>
            )}
            {teams.length === 0 && (
              <p className="mt-2 text-sm">
                Nie ma jeszcze zespołów. Możesz dodać pracownika bez zespołu.
              </p>
            )}
          </div>
        </>
      )}

      <div className="flex justify-end pt-4">
        <SubmitBtn>{employee ? "Zapisz zmiany" : "Dodaj pracownika"}</SubmitBtn>
      </div>
    </form>
  );
}
