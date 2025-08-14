/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> containing the cards (source structure)
  const ul = element.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children);

  // The block name must match the example: 'Cards'
  const cells = [['Cards']];

  // Each card row: [image, text]
  lis.forEach(li => {
    // Image cell:
    let imageCell = null;
    const imageDiv = li.querySelector('.cards-card-image');
    if (imageDiv) {
      // Reference the existing <picture> element if present, else <img>
      const picture = imageDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        const img = imageDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // Text cell: combine the children of .cards-card-body
    let textCell = null;
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Reference all body child nodes (preserves formatting and tags)
      const bodyChildren = Array.from(bodyDiv.childNodes).filter(node => {
        // Only include non-empty text or element nodes
        return (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim());
      });
      textCell = bodyChildren;
    }

    cells.push([imageCell, textCell]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with block
  element.replaceWith(block);
}
