/* global WebImporter */
export default function parse(element, { document }) {
  // Define header row based on example
  const headerRow = ['Cards (cards4)'];

  // Extract rows dynamically from the element
  const rows = Array.from(element.querySelectorAll(':scope > div ul > li')).map((card) => {
    // Extract image and body content dynamically
    const imageContainer = card.querySelector('.cards-card-image img');
    const bodyContainer = card.querySelector('.cards-card-body');

    // Clone image element or use empty text node if missing
    const imageElement = imageContainer ? imageContainer.cloneNode(true) : document.createTextNode('');

    // Extract all child nodes from body content dynamically, or use empty text node if missing
    const bodyElements = bodyContainer ? Array.from(bodyContainer.childNodes) : [document.createTextNode('')];

    // Return a row containing image and body content
    return [imageElement, bodyElements];
  });

  // Construct the table cells array
  const cells = [headerRow, ...rows];

  // Create the block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created block table
  element.replaceWith(blockTable);
}