/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the header row
  const headerRow = ['Cards (cards4)'];

  // Extract card rows dynamically
  const rows = [...element.querySelectorAll(':scope > div > ul > li')].map((item) => {
    // Extract the image
    const image = item.querySelector('.cards-card-image img');

    // Check if image exists and extract dynamically
    const imageElement = image ? image : document.createElement('span');
    if (image) {
      imageElement.src = image.src;
      imageElement.alt = image.alt;
    } else {
      imageElement.textContent = 'No Image Available';
    }

    // Extract the body content
    const body = item.querySelector('.cards-card-body');

    // Ensure body content is included dynamically
    return [
      imageElement,
      body ? body : document.createElement('span'),
    ];
  });

  // Construct the table data
  const tableData = [
    headerRow,
    ...rows
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}