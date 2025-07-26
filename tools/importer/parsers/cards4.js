/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> within the provided element (cards container)
  const ul = element.querySelector('ul');
  if (!ul) return;
  const cards = Array.from(ul.children); // <li> elements

  // Table header exactly matches example
  const headerRow = ['Cards'];

  // Each card row: [image, text content]
  const rows = cards.map((li) => {
    // Reference the image/picture in cell 1
    let imageCell = '';
    const imageDiv = li.querySelector('.cards-card-image');
    if (imageDiv) {
      const pic = imageDiv.querySelector('picture');
      if (pic) imageCell = pic;
      else {
        const img = imageDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // Reference all text content in cell 2, preserving paragraph/formatting
    let textCell = '';
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Push children (p, strong, etc) as-is to preserve formatting
      textCell = Array.from(bodyDiv.children);
    }

    return [imageCell, textCell];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows,
  ], document);

  element.replaceWith(table);
}
