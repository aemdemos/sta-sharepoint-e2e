/* global WebImporter */
export default function parse(element, { document }) {
  // According to the block description and example, there is only one table: Search (search1)
  // The second row must contain the absolute URL to the query index used for search.
  // The header must exactly match: 'Search (search1)'
  // There is no Section Metadata table in the example, so none is created.
  // There is no content in the header that should be dynamically extracted (the index URL is not present in the source HTML),
  // so we must use the canonical sample index URL as in the example.

  const headerRow = ['Search (search1)'];
  const indexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const cells = [
    headerRow,
    [indexUrl],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
