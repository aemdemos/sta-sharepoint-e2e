/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row as in the example
  const headerRow = ['Search (search1)'];

  // The query index URL as per the example markdown
  const queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  // Create a clickable link element for the URL
  const link = document.createElement('a');
  link.href = queryIndexUrl;
  link.textContent = queryIndexUrl;

  // Table structure: header and link row
  const cells = [
    headerRow,
    [link],
  ];

  // Create the block table and replace the element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
