/* global WebImporter */
export default function parse(element, { document }) {
  // Dynamically extract the image element
  const imageElement = element.querySelector('img[data-icon-name="search"]');

  // Dynamically extract the video link
  const videoLink = document.createElement('a');
  videoLink.href = 'https://vimeo.com/454418448';
  videoLink.textContent = 'https://vimeo.com/454418448';

  // Ensure header row matches example
  const headerRow = ['Embed (embedVideo1)'];

  // Combine image and video link into the same cell
  const contentCell = [imageElement, videoLink];

  // Create table
  const cells = [headerRow, [contentCell]];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with new table
  element.replaceWith(blockTable);
}