import "server-only";
import { getEmployeeAccessById } from "@/db/queries/employee";

export async function hasRole(
  userId: number,
  allowedRoles: string[],
): Promise<boolean> {
  const currentUser = await getEmployeeAccessById(userId);

  if (!currentUser) {
    return false;
  }

  return allowedRoles.includes(currentUser.role);
}
