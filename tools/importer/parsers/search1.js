/* global WebImporter */
export default function parse(element, { document }) {
  // Block table header: per example, must be exactly as shown
  const headerRow = ['Search (search1)'];

  // Block table content: The ONLY content in the table body is the query-index URL (absolute).
  // This is not present in the header HTML, so it is correct to hardcode it as per block description & example.
  // No other content from the header HTML is required or allowed in the block table.
  const url = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const link = document.createElement('a');
  link.href = url;
  link.textContent = url;

  const rows = [
    headerRow,
    [link]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
