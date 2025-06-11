/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main cards block
  let cardsBlock = element;
  // If element is a wrapper, drill down to the .cards.block
  if (!cardsBlock.classList.contains('cards') && cardsBlock.querySelector('.cards.block')) {
    cardsBlock = cardsBlock.querySelector('.cards.block');
  }

  // Get the <ul> containing the cards
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;

  const rows = [];
  // Header row as specified
  rows.push(['Cards (cards4)']);

  // Process each card <li>
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // First cell: image or icon (mandatory)
    let imageCell = null;
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      // Prefer a <picture> or <img>, but fallback to whatever is inside
      const imageElem = imgDiv.querySelector('picture, img');
      imageCell = imageElem ? imageElem : imgDiv;
    }
    // Second cell: text content (title, description, CTA)
    let textCell = null;
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Get elements only (remove whitespace text nodes)
      const nodes = Array.from(bodyDiv.childNodes).filter(n => n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent.trim() !== ''));
      if (nodes.length === 1) {
        textCell = nodes[0];
      } else {
        // Wrap all nodes in a <div> to preserve order/structure
        const wrapper = document.createElement('div');
        nodes.forEach(node => wrapper.appendChild(node));
        textCell = wrapper;
      }
    }
    rows.push([imageCell, textCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
