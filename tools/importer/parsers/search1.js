/* global WebImporter */
export default function parse(element, { document }) {
  // Extract content dynamically from the element
  const searchIcon = element.querySelector('img[data-icon-name="search"]');

  // Header row matches example structure
  const headerRow = ['Search (search1)'];

  // Attempt to dynamically locate a query index URL
  const queryIndexURL = element.querySelector('a[href]')?.href || 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  const queryIndexLink = document.createElement('a');
  queryIndexLink.href = queryIndexURL;
  queryIndexLink.textContent = queryIndexURL;

  // Table cell structure matches example
  const cells = [
    headerRow,
    [queryIndexLink]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}