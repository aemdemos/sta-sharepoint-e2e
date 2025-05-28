/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add the header row with the name of the block.
  const headerRow = ['Cards (cards1)'];
  cells.push(headerRow);

  // Select all card elements directly under the provided element.
  const cardElements = element.querySelectorAll(':scope > div');

  cardElements.forEach((card) => {
    // Extract image if available.
    const image = card.querySelector('img');

    // Extract text content.
    const title = card.querySelector('h2, h3, h4, h5'); // Title styled as a Heading.
    const description = card.querySelector('p'); // First paragraph.
    const callToAction = card.querySelector('a'); // Linked text.

    // Create content elements array dynamically.
    const contentElements = [];

    if (title) {
      contentElements.push(title);
    }

    if (description) {
      contentElements.push(description);
    }

    if (callToAction) {
      contentElements.push(callToAction);
    }

    // Push a row with image and content.
    cells.push([
      image || document.createElement('div'), // Ensure fallback for missing image.
      contentElements,
    ]);
  });

  // Create the table block.
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created table block.
  element.replaceWith(block);
}