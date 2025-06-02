/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards4)'];

  const rows = Array.from(element.querySelectorAll(':scope > div.cards > ul > li')).map((card) => {
    const image = card.querySelector('.cards-card-image picture');
    const content = card.querySelector('.cards-card-body');
    return [image, content];
  });

  const tableData = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}