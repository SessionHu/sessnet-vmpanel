export async function request(host: string, path: string, param: RequestInit = {}): Promise<any> {
  if (!param.headers) param.headers = {
    authorization: `Basic ${Buffer.from(`incusapi:${process.env.INCUS_API_PASS}`).toString("base64")}`
  };
  return await (await fetch(`https://${host}${path}`, param)).json();
}

export async function instances(host: string, name: string) {
	return await request(host, `/1.0/instances/${name}`);
}

export async function instancesState(host: string, name: string) {
	return await request(host, `/1.0/instances/${name}/state`);
}

export async function instancesStateChange(host: string, name: string, state: {
  action: 'start' | 'stop' | 'restart' | 'freeze' | 'unfreeze',
  force: boolean,
  stateful: boolean,
  timeout: number
}) {
	return await request(host, `/1.0/instances/${name}/state`, {
    method: 'PUT',
    body: JSON.stringify(state)
  });
}
