import { ReactNode } from "react"

type FormErrorProps = {
    children: ReactNode;
}

export function FormError({children}: FormErrorProps) {
    return <span className="text-(--error-color) text-sm">{children}</span>
}