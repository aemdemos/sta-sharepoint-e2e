/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant information for the header row
  const headerRow = ['Search (search1)'];

  // Dynamically extract the query index URL from the element
  const queryIndexSrc = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

   const queryIndexLink = document.createElement('a');
   queryIndexLink.href = queryIndexSrc;
   queryIndexLink.textContent = queryIndexSrc;

  // Handle edge cases if the query index URL is not present
  const queryIndexRow = [queryIndexLink];

  // Combine rows into table data
  const tableData = [headerRow, queryIndexRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}