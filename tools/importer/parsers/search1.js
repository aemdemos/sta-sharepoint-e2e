/* global WebImporter */
export default function parse(element, { document }) {
  // Critical Review:
  // - The block name 'Search (search1)' must be used as the header.
  // - The only content in the block is the absolute URL to the search index.
  // - There is no Section Metadata in the example.
  // - No content is to be extracted from the source element (it is for UI, not for the query index URL).
  // - The URL is fixed for this block type and matches the example.
  // - No extra cells or rows are to be added.
  // - No extra <hr> is to be inserted.
  // - Only a single table is to be created.
  // - The function does not use markdown, only proper DOM elements.
  // - The table is created via WebImporter.DOMUtils.createTable.
  // - The header matches exactly: 'Search (search1)'.
  // - No content from the source element is missed (since the query-index URL is required by the block, not derived from the element's markup).
  
  const headerRow = ['Search (search1)'];
  
  // Required query index absolute URL as specified by the Search (search1) block
  const searchIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const link = document.createElement('a');
  link.href = searchIndexUrl;
  link.textContent = searchIndexUrl;

  const rows = [
    headerRow,
    [link],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
