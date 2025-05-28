/* global WebImporter */
export default function parse(element, { document }) {
  const cards = Array.from(element.querySelectorAll(':scope > div.cards.block ul > li'));

  const rows = cards.map((card) => {
    const image = card.querySelector('picture');
    const textContent = card.querySelector('.cards-card-body');

    // Handle missing elements gracefully
    const processedImage = image || document.createElement('div');
    const processedTextContent = textContent || document.createElement('div');

    return [processedImage, processedTextContent];
  });

  const headerRow = ['Cards (cards4)'];
  const tableData = [headerRow, ...rows];

  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}