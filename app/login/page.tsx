import { auth, signIn } from "@/auth"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const session = await auth()
  if (session?.user) return redirect('/');
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
