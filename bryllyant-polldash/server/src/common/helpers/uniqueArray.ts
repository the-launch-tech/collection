export function uniqueArray<T>(array: T[] = [], key?: string): T[] {
  const temp = {}
  array.forEach((n: T) => (temp[!!key ? n[key].toString() : n.toString()] = n))
  return Object.keys(temp).map((k: string): T => temp[k])
}
