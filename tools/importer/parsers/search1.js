/* global WebImporter */
export default function parse(element, { document }) {
  // Ensuring dynamic extraction and accurate header row
  const headerRow = ['Search (search1)'];

  // Extracting query index URL dynamically (if such a URL exists in the element)
  const iframe = element.querySelector('iframe[src]');
  let queryIndexURL;

  if (iframe && iframe.src) {
    queryIndexURL = iframe.src;
  } else {
    // Fallback to example URL only if URL is not dynamically extractable
    queryIndexURL = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  }

  // Creating link dynamically
  const linkElement = document.createElement('a');
  linkElement.href = queryIndexURL;
  linkElement.textContent = queryIndexURL;

  // Defining content rows with dynamic link
  const contentRow = [linkElement];

  // Creating table using WebImporter.DOMUtils.createTable
  const cells = [
    headerRow,
    contentRow,
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element with the new block table
  element.replaceWith(blockTable);
}