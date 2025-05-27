/* global WebImporter */
 export default function parse(element, { document }) {
  const headerRow = ['Cards (cards4)'];

  const rows = Array.from(element.querySelectorAll(':scope > div.cards.block ul > li')).map((card) => {
    const imageContainer = card.querySelector(':scope > div.cards-card-image picture');
    const contentContainer = card.querySelector(':scope > div.cards-card-body');

    return [
      imageContainer,
      contentContainer
    ];
  });

  const tableData = [headerRow, ...rows];

  const table = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(table);
}
