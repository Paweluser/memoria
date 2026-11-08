"use client";

import { useActionState } from "react";
import type { SimpleEmployee } from "@/types/employeeTypes";
import type { TransportData } from "@/types/transportsTypes";
import { AppLink } from "@/app/components/AppLink";
import { Input } from "./UI/Input";
import { SubmitBtn } from "./UI/SubmitBtn";
import { FormError } from "./UI/FormError";
import {
  createTransportAction,
  updateTransportAction,
} from "@/actions/transportActions";

type TransportFormProps = {
  employees: SimpleEmployee[];
  transport?: TransportData & { id: number };
};

export function TransportForm({ employees, transport }: TransportFormProps) {
  const action = transport
    ? updateTransportAction.bind(null, transport.id)
    : createTransportAction;

  const [state, formAction, isPending] = useActionState(action, {
    errors: {},
  });

  return (
    <>
      <form action={formAction} className="mt-8 flex w-full flex-col space-y-6">
        <h2 className="border-b pb-2 text-xl">
          {transport ? "Edycja zlecenia transportu" : "Nowe zlecenie transportu"}
        </h2>

        {state?.errors?.general && (
          <FormError>{state.errors.general[0]}</FormError>
        )}

        <Input
          label="Miejsce odbioru"
          inputAttribute="transportFrom"
          type="text"
          defaultValue={transport?.transportFrom ?? ""}
        />
        {state?.errors?.transportFrom && (
          <FormError>{state.errors.transportFrom}</FormError>
        )}

        <Input
          label="Miejsce docelowe"
          inputAttribute="transportTo"
          type="text"
          defaultValue={transport?.transportTo ?? ""}
        />
        {state?.errors?.transportTo && (
          <FormError>{state.errors.transportTo}</FormError>
        )}

        <Input
          label="Telefon klienta"
          inputAttribute="clientPhoneNumber"
          type="tel"
          defaultValue={transport?.clientPhoneNumber ?? ""}
        />
        {state?.errors?.clientPhoneNumber && (
          <FormError>{state.errors.clientPhoneNumber}</FormError>
        )}

        <div className="flex flex-col">
          <label htmlFor="managerId" className="mb-1 text-sm font-medium">
            Osoba zlecająca
          </label>
          <select
            name="managerId"
            id="managerId"
            defaultValue={transport?.managerId ?? ""}
            disabled={isPending}
            className="rounded-md border p-2 text-sm shadow-sm focus:border-(--second-color) focus:ring-1 focus:ring-(--second-color) focus:outline-none"
          >
            <option value="">Brak / Wybierz później</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.firstName} {emp.lastName}
              </option>
            ))}
          </select>
          {state?.errors?.managerId && (
            <FormError>{state.errors.managerId}</FormError>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="employeeId" className="mb-1 text-sm font-medium">
            Przypisany pracownik
          </label>
          <select
            name="employeeId"
            id="employeeId"
            defaultValue={transport?.employeeId ?? ""}
            disabled={isPending}
            className="rounded-md border p-2 text-sm shadow-sm focus:border-(--second-color) focus:ring-1 focus:ring-(--second-color) focus:outline-none"
          >
            <option value="">Brak / Wybierz później</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.firstName} {emp.lastName}
              </option>
            ))}
          </select>
          {state?.errors?.employeeId && (
            <FormError>{state.errors.employeeId}</FormError>
          )}
        </div>

        <div className="flex flex-wrap justify-end gap-4 pt-4">
          {transport && (
            <AppLink href="/dashboard/transports">
              Wróć do listy przewozów
            </AppLink>
          )}
          <SubmitBtn>{transport ? "Zapisz zmiany" : "Zapisz transport"}</SubmitBtn>
        </div>
      </form>
    </>
  );
}
