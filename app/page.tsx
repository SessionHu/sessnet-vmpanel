import { auth } from "@/auth"

export default async function Home() {
  const session = await auth()

  return (
    <main>
      <h1>My App</h1>

      {session?.user ? (
        <>
          <p>
            Logged in as {session.user.email}
          </p>

          <a href="/dashboard">
            Dashboard
          </a>

          <br />

          <a href="/logout">
            Logout
          </a>
        </>
      ) : (
        <a href="/login">
          Login
        </a>
      )}
    </main>
  )
}
