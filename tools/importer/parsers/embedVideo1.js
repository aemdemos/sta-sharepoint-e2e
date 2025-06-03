/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row dynamically based on block name
  const headerRow = ['Embed (embedVideo1)'];

  // Extract iframe with src attribute, if present
  const iframe = element.querySelector('iframe[src]');
  let videoLink;
  if (iframe) {
    videoLink = document.createElement('a');
    videoLink.href = iframe.src;
    videoLink.textContent = iframe.src;
  }

  // Extract image element, if present
  const img = element.querySelector('img');

  // Construct the content row dynamically based on extracted elements
  const contentRow = img && videoLink ? [img, videoLink] : [videoLink];

  // Create the table cells array with header and content rows
  const cells = [headerRow, contentRow];

  // Create the block table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}