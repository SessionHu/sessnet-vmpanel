import { signIn } from "@/auth"

export default function LoginPage() {
  return (
    <main>
      <h1>Login</h1>

      <form
        action={async () => {
          "use server"

          await signIn("iedon", {
            redirectTo: "/dashboard",
          })
        }}
      >
        <button type="submit">
          Login with iEdon
        </button>
      </form>
    </main>
  )
}
