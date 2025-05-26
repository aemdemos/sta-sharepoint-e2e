/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the cards list from the element
  const cardsList = element.querySelectorAll(':scope > .cards > ul > li');

  // Prepare the table header row
  const headerRow = ['Cards (cards4)'];

  // Process each card and create rows for the table
  const rows = Array.from(cardsList).map((card) => {
    const imageContainer = card.querySelector('.cards-card-image picture');
    const image = imageContainer.querySelector('img');

    const bodyContainer = card.querySelector('.cards-card-body');
    const paragraphs = Array.from(bodyContainer.querySelectorAll('p'));

    // Build content cells
    const imageCell = image;
    const textCell = paragraphs;

    return [imageCell, textCell];
  });

  // Combine header and rows
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the block table
  element.replaceWith(blockTable);
}