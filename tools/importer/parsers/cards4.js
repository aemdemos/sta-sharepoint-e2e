/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> inside the element
  const ul = element.querySelector('ul');
  if (!ul) return;

  const rows = [];
  // Add the block header as required
  rows.push(['Cards']);

  // For each card
  ul.querySelectorAll(':scope > li').forEach(li => {
    // Column 1: image or icon
    let imageCell = null;
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      // Use the <picture> or <img> (if present)
      const picture = imgDiv.querySelector('picture');
      const img = imgDiv.querySelector('img');
      imageCell = picture || img || '';
    } else {
      imageCell = '';
    }

    // Column 2: text content
    let textCell = null;
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Use all children of bodyDiv in a fragment to preserve their structure
      const frag = document.createDocumentFragment();
      Array.from(bodyDiv.childNodes).forEach(node => {
        frag.appendChild(node);
      });
      textCell = frag;
    } else {
      textCell = '';
    }

    rows.push([imageCell, textCell]);
  });

  // Create block table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
