export const generateSlug = (text: string): string => text.toLowerCase()
    .trim()
    .replace(/[^\w- ]+/g, '')
    .replace(/ /g, '-')
    .replace(/[-]+/g, '-');
