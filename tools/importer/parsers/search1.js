/* global WebImporter */
export default function parse(element, { document }) {
  // The Search (search1) block expects a 1x2 table: header, then index URL
  // The example shows the header: 'Search (search1)'
  // The second row: the absolute URL to the query index (static in doc)
  // The HTML does not reference the query index URL directly, so the canonical sample URL is used
  // There is no Section Metadata table in the example, so do not add one

  const headerRow = ['Search (search1)'];
  const queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  // Create a link element for the index URL, as in the example
  const link = document.createElement('a');
  link.href = queryIndexUrl;
  link.textContent = queryIndexUrl;

  // Construct table rows
  const cells = [
    headerRow,
    [link]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
