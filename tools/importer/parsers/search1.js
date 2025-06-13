/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Build header row as in the example
  const headerRow = ['Search (search1)'];

  // 2. Extract the query-index URL. If it exists in HTML, use it, else default
  // Typically, this isn't present in source navigation HTML, so we use canonical sample index
  // If in a custom project this is present, update this extraction!
  const indexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const link = document.createElement('a');
  link.href = indexUrl;
  link.textContent = indexUrl;

  // 3. Structure for 1-column, 2-row table
  const cells = [
    headerRow,
    [link]
  ];

  // 4. Replace the original element with the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
