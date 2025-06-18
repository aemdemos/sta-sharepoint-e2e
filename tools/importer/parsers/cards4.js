/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main cards block
  let cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) cardsBlock = element;

  // Find the <ul> inside cardsBlock
  let ul = cardsBlock.querySelector('ul');
  if (!ul) ul = cardsBlock;

  const lis = Array.from(ul.querySelectorAll(':scope > li'));
  const cells = [['Cards (cards4)']];

  lis.forEach((li) => {
    // Extract image (only <picture> or <img>)
    let imageCell = '';
    const imageDiv = li.querySelector('.cards-card-image');
    if (imageDiv) {
      const picture = imageDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        const img = imageDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }
    // Extract text cell (only children of .cards-card-body, not the wrapper)
    let textCell = '';
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Only get non-empty text nodes and elements
      const nodes = Array.from(bodyDiv.childNodes).filter(n => {
        return !(n.nodeType === 3 && !n.textContent.trim()); // 3 === TEXT_NODE
      });
      textCell = nodes.length === 1 ? nodes[0] : nodes;
    }
    cells.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
