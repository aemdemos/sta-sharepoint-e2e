/* global WebImporter */
export default function parse(element, { document }) {
  // Per the Search (search1) block spec, the table contains:
  // Row 1: Header (block name/variant)
  // Row 2: Absolute URL to the search query index as plain text, NOT a link

  const headerRow = ['Search (search1)'];
  const url = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const urlRow = [url]; // Use plain string, not an <a> element

  const cells = [headerRow, urlRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
