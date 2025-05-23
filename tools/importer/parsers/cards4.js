/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row matching example structure
  const headerRow = ['Cards (cards4)'];

  // Extract rows dynamically based on cards structure
  const rows = [...element.querySelectorAll(':scope > div.cards.block ul li')].map((card) => {
    const image = card.querySelector('img'); // Extract image element
    const contentBody = card.querySelector('.cards-card-body'); // Extract content body

    // Ensure image and content body exist before adding to the row
    return [
      image || document.createElement('div'),
      contentBody || document.createElement('div'),
    ];
  });

  // Combine header and content rows into one table array
  const tableData = [headerRow, ...rows];

  // Create table block and replace original element
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(blockTable);
}