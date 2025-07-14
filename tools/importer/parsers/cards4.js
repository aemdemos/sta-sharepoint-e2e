/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Each <li> is a card
  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');

  // Prepare the table rows
  const rows = [];
  // Header row - block name exactly as in example
  rows.push(['Cards']);

  // Process each card
  lis.forEach(li => {
    // Image cell: find .cards-card-image, grab its first <picture> or <img>
    let imageCell = '';
    const imageDiv = li.querySelector('.cards-card-image');
    if (imageDiv) {
      // Reference the <picture> or <img> directly from document
      const pic = imageDiv.querySelector('picture');
      if (pic) {
        imageCell = pic;
      } else {
        const img = imageDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }
    // Text cell: use all children of .cards-card-body
    let textCell = '';
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Get all child nodes to preserve structure and semantics
      const nodes = Array.from(bodyDiv.childNodes).filter(n => {
        // Remove empty text nodes
        return !(n.nodeType === Node.TEXT_NODE && !n.textContent.trim());
      });
      if (nodes.length === 1) {
        textCell = nodes[0];
      } else if (nodes.length > 1) {
        textCell = nodes;
      } else {
        textCell = '';
      }
    }
    rows.push([imageCell, textCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element with the block
  element.replaceWith(block);
}
