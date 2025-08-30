/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards block (could be element or a child)
  let cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) {
    if (element.classList.contains('cards') && element.classList.contains('block')) {
      cardsBlock = element;
    } else {
      return;
    }
  }

  // Get the <ul> of the cards
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');

  // Header row as two cells so table is always 2 columns wide, matching the content rows
  const cells = [['Cards (cards4)', '']];

  lis.forEach(li => {
    // Find image: .cards-card-image > picture or img
    const imgDiv = li.querySelector('.cards-card-image');
    let imageContent = '';
    if (imgDiv) {
      const pic = imgDiv.querySelector('picture');
      if (pic) {
        imageContent = pic;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imageContent = img;
      }
    }
    // Find text: .cards-card-body
    const bodyDiv = li.querySelector('.cards-card-body');
    let textContent = '';
    if (bodyDiv) {
      textContent = bodyDiv;
    }
    cells.push([imageContent, textContent]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
