/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row for the block table
  const headerRow = ['Search (search1)']; // Static block name per specification

  // Extract the query index URL dynamically from the element
  let queryIndexURL = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json'; // Default fallback URL
  const searchBlock = element.querySelector('.nav-tools .icon-search img');

  // Ensure the img remains an img and find the correct URL dynamically
  if (searchBlock && searchBlock.src) {
    const resolvedURL = searchBlock.src.startsWith('http') ? searchBlock.src : `https://main--helix-block-collection--adobe.hlx.page${searchBlock.src}`;
    queryIndexURL = resolvedURL.includes('/query-index.json') ? resolvedURL : queryIndexURL; // Ensure the URL matches the intended query index
  }

  // Define the second row with the valid search query URL
  const secondRow = [
    (() => {
      const a = document.createElement('a');
      a.href = queryIndexURL;
      a.textContent = queryIndexURL;
      return a;
    })(),
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable([headerRow, secondRow], document);

  // Replace the original element with the block table
  element.replaceWith(block);
}