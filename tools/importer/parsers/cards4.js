/* global WebImporter */
 export default function parse(element, { document }) {
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow]; // start with the header row

  // Query all immediate child elements of the list inside the cards block
  const cards = element.querySelectorAll(':scope > div > ul > li');

  cards.forEach((card) => {
    const imageElement = card.querySelector(':scope .cards-card-image picture img');
    const bodyElement = card.querySelector(':scope .cards-card-body');
    
    if (imageElement && bodyElement) {
      const imageClone = imageElement.cloneNode(true);
      const bodyClone = bodyElement.cloneNode(true);
      rows.push([imageClone, bodyClone]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}