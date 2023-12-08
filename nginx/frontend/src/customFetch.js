export async function customFetch(url, { options }) {
  const handle = (promise) =>
    promise
      .then((data) => [undefined, data])
      .catch((err) => Promise.resolve([err, undefined]))

  const [err, result] = await handle(fetch(url, { ...options }))

  if (err) {
    throw new Error(`eRRoR - ${err.message}`)
  }
  return result
}
