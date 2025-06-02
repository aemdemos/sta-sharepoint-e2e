/* global WebImporter */
export default function parse(element, { document }) {
  const cards = Array.from(element.querySelectorAll(':scope > div > ul > li'));

  const rows = [
    ['Cards (cards4)'],
  ];

  cards.forEach((card) => {
    const imageContainer = card.querySelector('.cards-card-image');
    const img = imageContainer.querySelector('img');

    const contentContainer = card.querySelector('.cards-card-body');

    rows.push([
      img,
      contentContainer,
    ]);
  });

  const tableBlock = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(tableBlock);
}