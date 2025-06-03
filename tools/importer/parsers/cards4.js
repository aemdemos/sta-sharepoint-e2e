/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the header row is dynamically created based on the block name
  const headerRow = ['Cards (cards4)'];

  // Extract all rows dynamically from the source HTML
  const rows = Array.from(element.querySelectorAll(':scope > div ul > li')).map((card) => {
    const image = card.querySelector('.cards-card-image img');
    const body = card.querySelector('.cards-card-body');

    // Dynamically reference existing elements instead of cloning
    const pictureElement = image; // Referencing the existing image element

    const textElement = document.createElement('div');
    if (body) {
      textElement.append(...body.childNodes); // Append all child nodes of the body dynamically
    }

    return [pictureElement, textElement];
  });

  // Combine header and rows to create table data
  const tableData = [headerRow, ...rows];

  // Create the final table block using the helper function
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}