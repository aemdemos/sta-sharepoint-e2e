/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row correctly with the block name
  const headerRow = ['Search (search1)'];

  // Fix the second row to contain the absolute URL provided in the example
  const queryIndexURL = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  // Create a link element with the absolute URL
  const link = document.createElement('a');
  link.href = queryIndexURL;
  link.textContent = queryIndexURL;

  const contentRow = [link];

  // Create the table array ensuring it matches the example structure
  const cells = [headerRow, contentRow];

  // Create the block table using WebImporter.DOMUtils.createTable()
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}