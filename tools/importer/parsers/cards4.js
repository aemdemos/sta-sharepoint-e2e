/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards4)'];

  const cardElements = element.querySelectorAll(':scope > div > ul > li');
  const rows = Array.from(cardElements).map((card) => {
    const imageContainer = card.querySelector('.cards-card-image img');
    const image = document.createElement('img');
    image.src = imageContainer.src;
    image.alt = imageContainer.alt;

    const bodyContainer = card.querySelector('.cards-card-body');
    const bodyContent = Array.from(bodyContainer.children);

    return [image, bodyContent];
  });

  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}