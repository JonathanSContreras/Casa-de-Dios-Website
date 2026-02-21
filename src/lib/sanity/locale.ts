/**
 * Utility for resolving localized fields from Sanity documents.
 *
 * Sanity documents store both English and Spanish versions of content fields.
 * Convention: English field is `fieldName`, Spanish field is `fieldNameEs`.
 *
 * Usage:
 *   getLocalizedField(event, 'title', locale) // returns event.titleEs when locale='es'
 */
export function getLocalizedField(
  doc: object,
  field: string,
  locale: string,
): string {
  const record = doc as Record<string, unknown>;
  if (locale === 'es') {
    const esField = `${field}Es`;
    if (esField in record && record[esField]) return record[esField] as string;
  }
  return (record[field] ?? '') as string;
}
