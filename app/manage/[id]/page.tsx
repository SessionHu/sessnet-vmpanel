import { auth } from "@/auth";
import { getDatabase } from '@/database';
import { instances, instancesState, instancesStateChange } from '@/incusapi';
import { redirect, notFound } from "next/navigation";
import StateForm from './state-form';
import styles from './page.module.scss';

export default async function ManagePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }
  const { id } = await params
  if (isNaN(Number(id))) return notFound();
  const asn = session.user.dn42.asn
  const db = getDatabase()
  const instance = db.prepare(`
    SELECT
      instances.id,
      instances.name,
      instances.remote,
      instances.asn,
      remotes.host
    FROM instances
    LEFT JOIN remotes ON instances.remote = remotes.name
    WHERE instances.id = ?
      AND instances.asn = ?
  `).get(id, asn) as {
    id: number
    name: string
    remote: string
    asn: number
    host: string
  } | undefined
  db.close()
  if (!instance) return notFound();
  return (
    <main>
      <h1>Manage {instance.name}</h1>
      <p>
        <a href="/dashboard">Return to Dashboard</a>
      </p>
      <section>
        <h2>Name</h2>
        <p>{instance.name}</p>
        <h2>ASN</h2>
        <p>{instance.asn}</p>
        <h2>Remote</h2>
        <p>{instance.remote}</p>
        <h2>State</h2>
        <StateForm action={async (_, e) => {
          'use server';
          const o: any = {
            action: e.get('action'),
            force: e.get('force') || false,
            stateful: e.get('stateful') || false,
            timeout: Math.floor(Number(e.get('timeout'))) || 30
          };
          return await instancesStateChange(instance.host, instance.name, o);
        }} />
        <pre className={styles.pre}>{JSON.stringify(await instancesState(instance.host, instance.name), null, 2)}</pre>
        <h2>Instance</h2>
        <pre className={styles.pre}>{JSON.stringify(await instances(instance.host, instance.name), null, 2)}</pre>
      </section>
    </main>
  )
}
