/* global WebImporter */
export default function parse(element, { document }) {
  // The Search block requires only the block name header and the query index URL in row 2.
  // The query index is not present in the source HTML and must be provided as per component/block info.
  // Table structure:
  // [ ['Search (search1)'], [link to query-index.json] ]

  // Create the header row as per example
  const headerRow = ['Search (search1)'];

  // The example always uses the same query index URL (not found in the HTML, must be added literally)
  const indexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const linkEl = document.createElement('a');
  linkEl.href = indexUrl;
  linkEl.textContent = indexUrl;

  const cells = [
    headerRow,
    [linkEl],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
