/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  const headerRow = ['Cards (cards4)'];
  const rows = [];

  // Each <li> is a card
  ul.querySelectorAll(':scope > li').forEach(li => {
    // Image cell
    let imgCell = null;
    const imgDiv = li.querySelector(':scope > .cards-card-image');
    if (imgDiv) {
      const picture = imgDiv.querySelector('picture');
      if (picture) imgCell = picture;
    }

    // Text cell
    let textCell = null;
    const textDiv = li.querySelector(':scope > .cards-card-body');
    if (textDiv) {
      // Reference the original textDiv directly (not a clone)
      textCell = textDiv;
    }

    rows.push([imgCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
