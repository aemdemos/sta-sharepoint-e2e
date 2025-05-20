/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure header matches example requirements
  const headerRow = ['Hero']; // EXACTLY matching the example header

  // Extract image element, handling missing data
  const pictureElement = element.querySelector('picture') || element.querySelector('img');
  let imageElement = null;
  if (pictureElement) {
    const imgTag = pictureElement.querySelector('img');
    imageElement = imgTag || pictureElement;
  }

  // Extract heading text, ensuring proper handling of missing data
  const headingElement = element.querySelector('h1');
  const headingText = headingElement ? headingElement.textContent.trim() : '';

  // Create content row dynamically based on extracted data
  const contentRow = [];
  if (imageElement) contentRow.push(imageElement);
  if (headingText) contentRow.push(headingText);

  // Ensure no empty rows are created
  if (contentRow.length === 0) {
    console.warn('No valid content found for Hero block');
    return;
  }

  // Create the block table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}