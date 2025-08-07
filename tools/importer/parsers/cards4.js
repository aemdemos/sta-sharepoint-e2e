/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards block (may be the element itself or a child)
  let cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) {
    if (element.classList.contains('cards') && element.classList.contains('block')) {
      cardsBlock = element;
    } else {
      cardsBlock = element.querySelector('[data-block-name="cards"]');
    }
  }
  if (!cardsBlock) return;

  // Find the <ul> with <li> cards
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;

  const rows = [];
  // Header (must match example exactly)
  rows.push(['Cards']);

  // For each card (li)
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // Image/Icon cell
    let imgContainer = li.querySelector(':scope > .cards-card-image');
    let image = null;
    if (imgContainer) {
      // Prefer <picture> (preserves responsive + alt), else fallback to <img>
      const pic = imgContainer.querySelector('picture');
      if (pic) {
        image = pic;
      } else {
        image = imgContainer.querySelector('img');
      }
    }

    // Text content cell
    let textContainer = li.querySelector(':scope > .cards-card-body');
    let textCell = null;
    if (textContainer) {
      // Gather all children (preserve structure)
      const nodes = Array.from(textContainer.childNodes).filter(node => {
        // Omit empty text nodes
        return (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim());
      });
      if (nodes.length === 1) {
        textCell = nodes[0];
      } else if (nodes.length > 1) {
        // Wrap multiple nodes in a div
        const div = document.createElement('div');
        nodes.forEach(node => div.appendChild(node));
        textCell = div;
      }
    }

    rows.push([
      image,
      textCell
    ]);
  });

  // Create and replace with block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
