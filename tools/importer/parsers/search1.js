/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Search (search1)'];
  const searchIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  // Create a link element for the URL
  const link = document.createElement('a');
  link.href = searchIndexUrl;
  link.textContent = searchIndexUrl;
  const cells = [
    headerRow,
    [link],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}