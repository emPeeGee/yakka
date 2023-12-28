export function isBool(bool: BooleanConstructor | boolean | null | undefined) {
  return (
    typeof bool === 'boolean' ||
    (typeof bool === 'object' &&
      bool !== null &&
      typeof (bool as BooleanConstructor).valueOf() === 'boolean')
  );
}

Boolean(true);
