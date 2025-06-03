/* global WebImporter */
export default function parse(element, { document }) {
  // The cards block may be wrapped; find the actual cards block
  let cardsBlock = element.classList.contains('cards') ? element : element.querySelector('.cards');
  if (!cardsBlock) return;

  // Get the list of cards (li elements)
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  const cardLis = Array.from(ul.children).filter(li => li.nodeName === 'LI');

  const headerRow = ['Cards (cards4)'];
  const rows = [];

  cardLis.forEach(li => {
    // Image cell: .cards-card-image > picture or img
    const imageDiv = li.querySelector('.cards-card-image');
    let imageCell = '';
    if (imageDiv) {
      // prefer <picture>; fallback to <img>
      const picture = imageDiv.querySelector('picture');
      if (picture) imageCell = picture;
      else {
        const img = imageDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }
    // Text cell: .cards-card-body
    const bodyDiv = li.querySelector('.cards-card-body');
    let textCell = '';
    if (bodyDiv) textCell = bodyDiv;
    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
