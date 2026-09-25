import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <main>
      <h1>Dashboard</h1>

      <p>
        Hello {session.user.name}
      </p>

      <p>
        Email: {session.user.email}
      </p>

      <p>
        ASN: {session.user.dn42.asn}
      </p>
    </main>
  )
}
