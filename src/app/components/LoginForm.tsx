export function LoginForm() {
  return (
    <form action="" className="mt-8 flex w-full flex-col space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm">
          E-mail:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm">
          Hasło:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          required
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>
      <button
        type="submit"
        className="cursor-pointer rounded-lg bg-(--second-color) px-8 py-3 text-(--main-color) transition-colors duration-300 hover:bg-(--accent-color)"
      >
        Zaloguj się
      </button>
    </form>
  );
}
