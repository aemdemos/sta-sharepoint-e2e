/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row, per specification
  const headerRow = ['Search (search1)'];

  // 2. The search block requires the absolute URL to the query index
  // In this boilerplate, it's not present in the HTML, so we must use the canonical example URL
  // If the URL were present in the DOM, we would extract it, but in this example, it is not.
  const searchIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  // 3. Create a link element referencing the search index URL, as in the example
  const link = document.createElement('a');
  link.href = searchIndexUrl;
  link.textContent = searchIndexUrl;

  // 4. The block table: 1 col, 2 rows as in the example
  const rows = [
    headerRow,
    [link],
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);

  // 5. Replace the original element (header) with the new block table
  element.replaceWith(block);
}
