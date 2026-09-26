"use client";

import React from "react";
import styles from './page.module.scss';

export default function StateForm({
  action,
}: {
  action: (prevState: any, formData: FormData) => Promise<any>
}) {
  const [state, formAction, pending] = React.useActionState(
    action, null
  )
  console.log(state, formAction, pending)
  return (
    <form action={formAction}>
      <div>
        <label htmlFor="action">Action</label>
        <select id="action" name="action">
          <option value="start">start</option>
          <option value="stop">stop</option>
          <option value="restart">restart</option>
          <option value="freeze">freeze</option>
          <option value="unfreeze">unfreeze</option>
        </select>
      </div>
      <div>
        <label htmlFor="force">Force</label>
        <input type="checkbox" name="force" value="true" />
      </div>
      <div>
        <label htmlFor="stateful">Stateful</label>
        <input type="checkbox" name="stateful" value="true" />
      </div>
      <div>
        <label htmlFor="timeout">Timeout</label>
        <input
          id="timeout"
          name="timeout"
          type="number"
          defaultValue="30"
          min="0"
          step="1"
        />
      </div>
      <button type="submit">Submit</button>
      {state ? <pre className={styles.pre}>{JSON.stringify(state, null, 2)}</pre> : ''}
    </form>
  )
}
