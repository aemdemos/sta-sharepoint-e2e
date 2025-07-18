/* global WebImporter */
export default function parse(element, { document }) {
  // Find cards block: it could be 'element' itself, or a child
  let cardsBlock = element;
  if (!cardsBlock.classList.contains('cards')) {
    cardsBlock = element.querySelector('.cards');
    if (!cardsBlock) return;
  }

  // Get the <ul> containing cards
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;

  // Start our table with the header
  const cells = [['Cards']];

  // For each card <li>, extract image/icon and content
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // IMAGE CELL
    let imgCell = '';
    const imgWrapper = li.querySelector('.cards-card-image');
    if (imgWrapper) {
      // Use the <picture> for best compatibility
      const pic = imgWrapper.querySelector('picture');
      if (pic) {
        imgCell = pic;
      } else {
        // Fallback to <img> if no <picture>
        const img = imgWrapper.querySelector('img');
        if (img) imgCell = img;
      }
    }

    // TEXT CELL
    let textCell = '';
    const body = li.querySelector('.cards-card-body');
    if (body) {
      // Collect all direct children (<p>, etc.) to keep structure
      const nodes = Array.from(body.childNodes).filter((n) => {
        // filter out empty text nodes
        return !(n.nodeType === Node.TEXT_NODE && !n.textContent.trim());
      });
      textCell = nodes.length === 1 ? nodes[0] : nodes;
    }
    cells.push([imgCell, textCell]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
