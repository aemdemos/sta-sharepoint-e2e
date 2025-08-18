/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;
  const items = Array.from(ul.children); // Each <li> is a card

  // Start with the header row exactly as in the example
  const cells = [['Cards']];

  items.forEach((li) => {
    // Find the image or icon column
    let imageCell = null;
    const imageContainer = li.querySelector('.cards-card-image');
    if (imageContainer) {
      // Prefer <picture> if present for best markup fidelity
      const picture = imageContainer.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        const img = imageContainer.querySelector('img');
        if (img) imageCell = img;
      }
    }
    // Find the text content column (can be multiple <p>, etc)
    let textCell = null;
    const bodyContainer = li.querySelector('.cards-card-body');
    if (bodyContainer) {
      // Use all children to preserve the structure (e.g., <p>, <strong>, etc)
      const bodyChildren = Array.from(bodyContainer.children);
      if (bodyChildren.length === 1) {
        textCell = bodyChildren[0];
      } else {
        textCell = bodyChildren;
      }
    }
    // Add the row only if both image and text are present to avoid empty rows
    if (imageCell && textCell) {
      cells.push([imageCell, textCell]);
    }
  });

  // Create the block table using the provided helper
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
