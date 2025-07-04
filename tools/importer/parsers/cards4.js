/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> containing all cards
  const ul = element.querySelector('ul');
  if (!ul) return;
  const cards = Array.from(ul.children).filter(li => li.tagName === 'LI');

  // The first row: header row exactly as in the example
  const rows = [['Cards']];

  cards.forEach(card => {
    // Image cell: look for picture or img in .cards-card-image
    const imageDiv = card.querySelector('.cards-card-image');
    let imageEl = null;
    if (imageDiv) {
      const picture = imageDiv.querySelector('picture');
      if (picture) {
        imageEl = picture;
      } else {
        const img = imageDiv.querySelector('img');
        if (img) imageEl = img;
      }
    }
    // Text cell: .cards-card-body with all its children
    const bodyDiv = card.querySelector('.cards-card-body');
    let textContent = [];
    if (bodyDiv) {
      // Get <p> children, keep <strong> inside (no headings in source)
      const ps = Array.from(bodyDiv.children).filter(c => c.tagName === 'P');
      // If first <p> has <strong>, treat as heading, keep structure
      if (ps.length > 0) {
        textContent.push(ps[0]);
        for (let i = 1; i < ps.length; i++) {
          textContent.push(ps[i]);
        }
      } else {
        textContent = Array.from(bodyDiv.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()));
      }
    }
    rows.push([
      imageEl,
      textContent.length === 1 ? textContent[0] : textContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
