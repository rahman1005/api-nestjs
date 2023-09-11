export const generateSlug = (text: string): string => text.toLowerCase()
    .trim()
    .replace(/[^\w- ]+/g, '')
    .replace(/ /g, '-')
    .replace(/[-]+/g, '-');

export const stripHtmlTagsFromText = (html: string): string =>
(html.replace(/<style[^>]*>.*<\/style>/g, '')
    // Remove script tags and content
    .replace(/<script[^>]*>.*<\/script>/g, '')
    // Remove all opening, closing and orphan HTML tags
    .replace(/<[^>]+>/g, '')
    // Remove leading spaces and repeated CR/LF
    .replace(/([\r\n]+ +)+/g, ''));
