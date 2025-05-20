/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract image and text content
  const extractCardContent = (card) => {
    const imgElement = card.querySelector('img');
    const img = document.createElement('img');
    img.src = imgElement ? imgElement.src : '';
    img.alt = imgElement ? imgElement.alt : '';

    const strongElement = card.querySelector('p strong');
    const title = strongElement ? strongElement.textContent.trim() : '';

    const descriptionElement = strongElement?.nextElementSibling;
    const description = descriptionElement ? descriptionElement.textContent.trim() : '';

    return [img, title && description ? `${title}<br>${description}` : title || description];
  };

  // Extract all cards
  const cards = [...element.querySelectorAll('li')];
  const cardRows = cards.map((card) => extractCardContent(card));

  // Create table structure
  const tableData = [
    ['Cards'],
    ...cardRows
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}