import { CheckCircle2, XCircle } from "lucide-react";
import { AppBtn } from "./AppBtn";

type ModalProps = {
  type: "success" | "error";
  message: string;
  onClose: () => void;
};

export function Modal({ type, message, onClose }: ModalProps) {
  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="max-w-md rounded-xl border border-(--second-color) bg-(--main-color) p-4 md:p-6">
        <div className="flex flex-col items-center text-center">
          {isSuccess ? (
            <CheckCircle2 className="mb-4 h-16 w-16 text-(--accent-color)" />
          ) : (
            <XCircle className="mb-4 h-16 w-16 text-(--accent-color)" />
          )}

          <h3 className="mb-2 text-xl font-bold text-gray-900">
            {isSuccess ? "Sukces!" : "Wystąpił problem"}
          </h3>

          <p className="mb-6">{message}</p>

          <AppBtn onClick={onClose}>
            {isSuccess ? "Przejdź do listy" : "Spróbuj ponownie"}
          </AppBtn>
        </div>
      </div>
    </div>
  );
}
