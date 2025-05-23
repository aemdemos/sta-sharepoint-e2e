/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Search (search1)'];

  // Use the static absolute URL provided in the example as the query index link
  const queryIndexURL = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const urlLink = document.createElement('a');
  urlLink.href = queryIndexURL;
  urlLink.textContent = queryIndexURL;

  // Construct the rows for the block table
  const rows = [
    headerRow, // Header row
    [urlLink], // Content row with the query index URL
  ];

  // Create the block table and replace the original element
  const tableBlock = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(tableBlock);
}