/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> directly inside the block (inside cards block)
  const ul = element.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');

  // Table header row: use the block name exactly as specified
  const rows = [['Cards (cards4)']];

  lis.forEach(li => {
    // Get image cell: the <picture> inside the .cards-card-image div
    let imageCell = null;
    const imageDiv = li.querySelector('.cards-card-image');
    if (imageDiv) {
      const picture = imageDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        // fallback if no <picture>
        const img = imageDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }
    // Get text cell: all children from the .cards-card-body div (preserving formatting)
    let textCell = null;
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // If there are multiple child nodes, use them all (including elements and text)
      const bodyContent = Array.from(bodyDiv.childNodes).filter(node => {
        // filter out empty text nodes
        return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
      });
      // If only one node, use directly, otherwise use array
      textCell = bodyContent.length === 1 ? bodyContent[0] : bodyContent;
    }
    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
