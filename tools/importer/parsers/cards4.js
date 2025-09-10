/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Table header as required
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Get all <li> (cards)
  const cards = ul.querySelectorAll(':scope > li');
  cards.forEach((li) => {
    // Defensive: get image container and body container
    const imgContainer = li.querySelector('.cards-card-image');
    const bodyContainer = li.querySelector('.cards-card-body');

    // Get image (use <picture> if present, else <img>)
    let imageEl = null;
    if (imgContainer) {
      imageEl = imgContainer.querySelector('picture') || imgContainer.querySelector('img');
    }

    // Get text content (title + description)
    let textEl = null;
    if (bodyContainer) {
      // Wrap all body content in a <div> for semantic grouping
      const div = document.createElement('div');
      // Defensive: append all children (preserves <p>, <strong>, etc)
      Array.from(bodyContainer.childNodes).forEach((node) => {
        div.appendChild(node.cloneNode(true));
      });
      textEl = div;
    }

    // Only add row if both image and text are present
    if (imageEl && textEl) {
      rows.push([imageEl, textEl]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
