import { auth, signOut } from "@/auth"

export default async function Home() {
  const session = await auth()

  return (
    <main>
      <h1>SessNetwork VM Panel</h1>

      {session?.user ? (
        <>
          <p>
            Logged in as {session.user.email}
          </p>
          <a href="/dashboard">
            Dashboard
          </a>
          <br />
          <a href="#" onClick={async (e) => {
            "use server";
            await signOut({
              redirectTo: "/",
            })
          }}>
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
