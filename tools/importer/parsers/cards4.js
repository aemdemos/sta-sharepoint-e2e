/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards block, support both .cards.block and ul > li pattern
  const cardsBlock = element.querySelector('.cards.block') || element;
  const ul = cardsBlock.querySelector('ul');
  const cardLis = ul ? ul.querySelectorAll(':scope > li') : [];
  const cells = [['Cards']]; // Header row, matches example
  cardLis.forEach((li) => {
    // Image cell: .cards-card-image > picture (reference directly)
    const imgDiv = li.querySelector('.cards-card-image');
    let imageCell = null;
    if (imgDiv) {
      const pic = imgDiv.querySelector('picture');
      if (pic) {
        imageCell = pic;
      }
    }
    // Text cell: .cards-card-body (reference all children, preserve structure)
    const bodyDiv = li.querySelector('.cards-card-body');
    let textCell = null;
    if (bodyDiv) {
      // Gather all child nodes (not just elements), to retain any formatting
      const nodes = Array.from(bodyDiv.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()));
      textCell = nodes.length === 1 ? nodes[0] : nodes;
    }
    // Push row (image, text)
    cells.push([imageCell, textCell]);
  });
  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace original element
  element.replaceWith(block);
}
