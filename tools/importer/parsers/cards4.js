/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards block and its <ul>
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');
  const rows = [['Cards (cards4)']];

  lis.forEach(li => {
    const imgDiv = li.querySelector('.cards-card-image');
    const bodyDiv = li.querySelector('.cards-card-body');
    // Defensive in case of missing nodes
    rows.push([
      imgDiv ? imgDiv : '',
      bodyDiv ? bodyDiv : ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
