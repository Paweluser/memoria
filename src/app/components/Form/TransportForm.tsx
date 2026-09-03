"use client";

import { useActionState } from "react";
import { SimpleEmployee } from "@/types/employeeTypes";
import { Input } from "./UI/Input";
import { SubmitBtn } from "./UI/SubmitBtn";
import { FormError } from "./UI/FormError";
import {
  createTransportAction,
  type TransportFormState,
} from "@/actions/transportActions";

type TransportFormProps = {
  employees: SimpleEmployee[];
};

const initialState: TransportFormState = {};

export function TransportForm({ employees }: TransportFormProps) {
  const [state, formAction] = useActionState(
    createTransportAction,
    initialState,
  );

  return (
    <>
      <form action={formAction} className="mt-8 flex w-full flex-col space-y-6">
        <h2 className="border-b pb-2 text-xl">Nowe zlecenie transportu</h2>

        <Input
          label="Miejsce odbioru"
          inputAttribute="transportFrom"
          type="text"
        />
        {state?.fieldErrors?.transportFrom && (
          <FormError>{state.fieldErrors.transportFrom}</FormError>
        )}

        <Input
          label="Miejsce docelowe"
          inputAttribute="transportTo"
          type="text"
        />
        {state?.fieldErrors?.transportTo && (
          <FormError>{state.fieldErrors.transportTo}</FormError>
        )}

        <Input
          label="Telefon klienta"
          inputAttribute="clientPhoneNumber"
          type="tel"
        />
        {state?.fieldErrors?.clientPhoneNumber && (
          <FormError>{state.fieldErrors.clientPhoneNumber}</FormError>
        )}

        <div className="flex flex-col">
          <label htmlFor="managerId" className="mb-1 text-sm font-medium">
            Osoba zlecająca
          </label>
          <select
            name="managerId"
            id="managerId"
            className="rounded-md border p-2 text-sm shadow-sm focus:border-(--second-color) focus:ring-1 focus:ring-(--second-color) focus:outline-none"
          >
            <option value="">Brak / Wybierz później</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.firstName} {emp.lastName}
              </option>
            ))}
          </select>
          {state?.fieldErrors?.managerId && (
            <FormError>{state.fieldErrors.managerId}</FormError>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="employeeId" className="mb-1 text-sm font-medium">
            Przypisany pracownik
          </label>
          <select
            name="employeeId"
            id="employeeId"
            className="rounded-md border p-2 text-sm shadow-sm focus:border-(--second-color) focus:ring-1 focus:ring-(--second-color) focus:outline-none"
          >
            <option value="">Brak / Wybierz później</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.firstName} {emp.lastName}
              </option>
            ))}
          </select>
          {state?.fieldErrors?.employeeId && (
            <FormError>{state.fieldErrors.employeeId}</FormError>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <SubmitBtn>Zapisz transport</SubmitBtn>
        </div>
      </form>
    </>
  );
}
