/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .cards.block, which contains the <ul>
  let cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) {
    // Fallback: maybe 'element' is already the .cards.block
    if (element.classList.contains('cards') && element.classList.contains('block')) {
      cardsBlock = element;
    } else {
      return; // Not a cards block
    }
  }
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children);

  // Compose the table rows
  const rows = [['Cards']];
  lis.forEach((li) => {
    // Image cell
    let imageCell = '';
    const imageDiv = li.querySelector('.cards-card-image');
    if (imageDiv) {
      // Use the <picture> element if possible for compatibility
      const picture = imageDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        const img = imageDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // Text cell - all content inside .cards-card-body
    let textCell = '';
    const textDiv = li.querySelector('.cards-card-body');
    if (textDiv) {
      // Preserve all child nodes (to keep formatting like <strong>, <p>, etc)
      textCell = Array.from(textDiv.childNodes);
    }

    rows.push([imageCell, textCell]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
