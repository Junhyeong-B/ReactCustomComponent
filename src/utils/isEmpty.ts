export default function isEmpty<T>(obj: T): boolean {
  if (Array.isArray(obj) || typeof obj === 'string' || obj instanceof String) {
    return obj.length === 0;
  }

  if (typeof obj === 'object' && obj != null) {
    return Object.keys(obj).length === 0;
  }

  return true;
}
