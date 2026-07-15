import 'server-only';
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

if (!process.env.JWT_SECRET) {
    throw new Error("Brak zmiennej jwt!");
}

const secretKey = process.env.JWT_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
    userId: number;
    role?: string;
    [key: string]: unknown;
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export async function createSession(userId: number, role: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, role });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function verifySession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
        return null;
    }

    const payload = await decrypt(sessionCookie);
    return payload;
}

export async function requireUser() {
    const session = await verifySession();

    if (!session) {
        redirect('/login')
    }

    return session;
}

export async function updateSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  const payload = await decrypt(sessionCookie);
  
  if (!sessionCookie || !payload) {
    return null;
  }
  
  const newSessionToken = await encrypt({ userId: payload.userId, role: payload.role });
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  
  cookieStore.set('session', newSessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}