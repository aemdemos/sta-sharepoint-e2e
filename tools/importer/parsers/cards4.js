/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .cards.block element inside the wrapper, if present
  let cardsBlock = element;
  if (!cardsBlock.classList.contains('cards') || !cardsBlock.classList.contains('block')) {
    cardsBlock = element.querySelector('.cards.block');
    if (!cardsBlock) return;
  }

  // Find the list of cards
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  const items = Array.from(ul.children).filter(li => li.nodeType === 1);

  // Prepare table rows
  const rows = [['Cards']];

  items.forEach((li) => {
    // Card Image (first cell)
    let imgCell = null;
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      // Prefer <picture> if present
      const picture = imgDiv.querySelector('picture');
      if (picture) imgCell = picture;
      else {
        const img = imgDiv.querySelector('img');
        if (img) imgCell = img;
      }
    }
    // Card Body (second cell)
    const bodyDiv = li.querySelector('.cards-card-body');
    let textCell = null;
    if (bodyDiv) {
      // Gather all children, preserving elements and whitespace
      const children = Array.from(bodyDiv.childNodes).filter(n => {
        if (n.nodeType === 1) return true; // element
        if (n.nodeType === 3) return n.textContent.trim().length > 0; // text node
        return false;
      }).map(n => {
        if (n.nodeType === 3) {
          const span = document.createElement('span');
          span.textContent = n.textContent;
          return span;
        }
        return n;
      });
      textCell = children.length === 1 ? children[0] : children;
    }
    rows.push([imgCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
