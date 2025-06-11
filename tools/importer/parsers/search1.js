/* global WebImporter */
export default function parse(element, { document }) {
  // The block header, as specified
  const headerRow = ['Search (search1)'];
  // The required query index URL as plain text (not as a link)
  const queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  // Construct the table rows, using a plain string for the URL
  const rows = [headerRow, [queryIndexUrl]];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}