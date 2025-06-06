/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> with all cards
  const ul = element.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children);

  // Header row must exactly match the example
  const cells = [
    ['Cards (cards4)']
  ];

  // Each li is a card; handle each card
  lis.forEach(li => {
    // First column: The image or icon
    let imgCell = '';
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      const picture = imgDiv.querySelector('picture');
      imgCell = picture ? picture : imgDiv;
    }

    // Second column: Text content
    let textCell = '';
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Use all child nodes, preserving formatting (strong, paragraph, etc). Reference nodes, do not clone.
      textCell = Array.from(bodyDiv.childNodes);
    }

    cells.push([
      imgCell,
      textCell
    ]);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
