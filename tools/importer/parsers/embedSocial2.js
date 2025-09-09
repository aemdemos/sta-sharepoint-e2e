/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required block header
  const headerRow = ['Embed (embedSocial2)'];

  // Per feedback: If no social embed URL, include all text content to ensure nothing is missing
  let cellContent = '';

  // Try to find a direct link to a social post or external embed
  const link = element.querySelector('a[href^="http"]');
  if (link) {
    cellContent = link.href;
  }

  // If no link, check for iframes
  if (!cellContent) {
    const iframe = element.querySelector('iframe[src^="http"]');
    if (iframe) {
      cellContent = iframe.src;
    }
  }

  // If no social embed, fallback: include all text content (to ensure nothing is missing)
  if (!cellContent) {
    const text = element.textContent.trim();
    if (text) {
      cellContent = text;
    }
  }

  const rows = [
    headerRow,
    [cellContent],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
