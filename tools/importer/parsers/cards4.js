/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the actual <ul> with the cards
  const ul = element.querySelector('ul');
  if (!ul) return;
  const cards = Array.from(ul.children).filter(li => li.tagName === 'LI');

  // Build block header
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  cards.forEach((li) => {
    // Image cell
    let imageCell = null;
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      // Use the <picture> as a whole if possible, for all sources
      const pic = imgDiv.querySelector('picture');
      if (pic) {
        imageCell = pic;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }
    // Text cell
    let textCell = null;
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Use all child nodes (not just <p>), retain formatting (e.g., <strong>)
      textCell = Array.from(bodyDiv.childNodes).filter(node => {
        // Remove empty text nodes
        return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
      });
    }
    // Always provide both cells, even if one is null
    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
