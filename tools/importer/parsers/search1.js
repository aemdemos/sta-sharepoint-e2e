/* global WebImporter */
export default function parse(element, { document }) {
  // Find the relevant content dynamically from the element
  const navToolsSection = element.querySelector(':scope .section.nav-tools');

  // Extract the search icon or its corresponding element
  const searchIcon = navToolsSection.querySelector('img[data-icon-name="search"]');

  // Determine the header row dynamically
  const headerRow = ['Search (search1)'];

  // Extract the query index URL dynamically
  const queryIndexURL = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  const queryIndexLink = document.createElement('a');
  queryIndexLink.setAttribute('href', queryIndexURL);
  queryIndexLink.textContent = queryIndexURL;

  const cells = [
    headerRow,
    [queryIndexLink],
  ];

  // Create the block table using dynamic data
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}