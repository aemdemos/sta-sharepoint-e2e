/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .cards.block element (could be element itself or child)
  let cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) {
    if (element.classList.contains('cards') && element.classList.contains('block')) {
      cardsBlock = element;
    } else {
      // If not found, do nothing
      return;
    }
  }
  // Find the <ul> inside cardsBlock and the <li> cards
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children).filter(child => child.tagName === 'LI');

  // Header row for the table block
  const rows = [['Cards']];

  lis.forEach((li) => {
    // Find image (picture preferred) in image wrapper
    const imageDiv = li.querySelector('.cards-card-image');
    let imageEl = null;
    if (imageDiv) {
      const pic = imageDiv.querySelector('picture');
      if (pic) {
        imageEl = pic;
      } else {
        const img = imageDiv.querySelector('img');
        if (img) imageEl = img;
      }
    }
    // Find card content in body wrapper
    const bodyDiv = li.querySelector('.cards-card-body');
    // Only add row if both image and body exist
    if (imageEl && bodyDiv) {
      rows.push([imageEl, bodyDiv]);
    }
  });

  // Create cards table and replace the wrapper element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
