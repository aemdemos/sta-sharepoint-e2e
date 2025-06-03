/* global WebImporter */
export default function parse(element, { document }) {
  // The block expects a 1x2 table:
  // Row 1: Header: Search (search1)
  // Row 2: The absolute URL to the query index (not present in the HTML, so we use the documented default)
  // No Section Metadata block in example, so do not create one or an <hr>.

  const headerRow = ['Search (search1)'];
  const queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  // If, in a real implementation, the query index could be found in the DOM, we would attempt to extract it. But in this HTML, it's not present.

  const cells = [
    headerRow,
    [queryIndexUrl],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
