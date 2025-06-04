/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Search (search1)'];

  // The absolute URL to the query index as per the block's documentation/spec.
  const searchIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  // Create a link element for the URL (which was missing previously)
  const link = document.createElement('a');
  link.href = searchIndexUrl;
  link.textContent = searchIndexUrl;

  // Compose the table: 1 column, 2 rows
  const cells = [
    headerRow,
    [link]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}