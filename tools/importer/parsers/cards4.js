/* global WebImporter */
export default function parse(element, { document }) {
  // Build the block header
  const headerRow = ['Cards'];
  const cells = [headerRow];

  // Find the actual block
  let cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) cardsBlock = element;
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;

  ul.querySelectorAll('li').forEach(card => {
    // First cell: the image or picture
    let imgEl = null;
    const imgContainer = card.querySelector('.cards-card-image');
    if (imgContainer) {
      const picture = imgContainer.querySelector('picture');
      if (picture) {
        imgEl = picture;
      } else {
        const img = imgContainer.querySelector('img');
        if (img) imgEl = img;
      }
    }

    // Second cell: the card body content (all children)
    const bodyContainer = card.querySelector('.cards-card-body');
    let bodyEls = [];
    if (bodyContainer) {
      bodyEls = Array.from(bodyContainer.childNodes)
        .filter(node => node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim()));
      // Reference existing nodes only, not cloning
    }

    cells.push([imgEl, bodyEls]);
  });

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
