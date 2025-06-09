/* global WebImporter */
export default function parse(element, { document }) {
  // The Search (search1) block expects the header as specified and the query index as plain text
  const headerRow = ['Search (search1)'];
  const url = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const urlRow = [url]; // Use plain text, not a link
  const cells = [headerRow, urlRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
