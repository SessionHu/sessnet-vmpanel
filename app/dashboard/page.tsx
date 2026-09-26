import { auth } from "@/auth"
import { getDatabase } from '@/database'
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const asn = session.user.dn42.asn

  const db = getDatabase()

  const instances = db.prepare(`
    SELECT
      instances.id,
      instances.name,
      instances.remote,
      instances.asn
    FROM instances
    WHERE instances.asn = ?
    ORDER BY instances.id
  `).all(asn)

  db.close()

  return (
    <main>
      <h1>Dashboard</h1>

      <a href="/">Return to Home</a>

      <p>
        Hello {session.user.name}
      </p>

      <p>
        Email: {session.user.email}
      </p>

      <p>
        ASN: {asn}
      </p>

      <h2>Instances</h2>

      {instances.length === 0 ? (
        <p>No instances.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Remote</th>
              <th>Manage</th>
            </tr>
          </thead>

          <tbody>
            {instances.map((instance) => (
              <tr key={instance.id?.toString()}>
                <td>{instance.id}</td>
                <td>{instance.name}</td>
                <td>{instance.remote}</td>
                <td><a href={`/manage/${instance.id}`}>manage</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}
