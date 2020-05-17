export function getValueType(value: any): string {
  return value.match(/^\d+$/) ? "number" : typeof value;
}

export function getLength(value: any): number {
  const type = getValueType(value);
  return type === "string" ? value.length : value;
}
