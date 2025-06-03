/* global WebImporter */
export default function parse(element, { document }) {
  // Extract dynamic content from the provided element
  const navWrapper = element.querySelector('.nav-wrapper');
  const searchIcon = navWrapper?.querySelector('.icon-search img');

  // Ensure necessary elements exist
  if (!searchIcon) {
    console.warn('Search icon not found, skipping table generation.');
    return;
  }

  // Define the header row for the search block
  const headerRow = ['Search (search1)'];

  // Construct the second row dynamically with the Query Index URL
  const queryIndexURL = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const link = document.createElement('a');
  link.href = queryIndexURL;
  link.textContent = queryIndexURL;
  const secondRow = [link];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([headerRow, secondRow], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}