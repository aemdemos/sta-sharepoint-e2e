/* global WebImporter */
export default function parse(element, { document }) {
  // Safety: find .cards.block inside the wrapper
  const block = element.querySelector('.cards.block');
  if (!block) return;
  const ul = block.querySelector('ul');
  if (!ul) return;

  // Table header: Matches example
  const rows = [['Cards']];

  // Iterate each card (li)
  Array.from(ul.children).forEach((li) => {
    // Image (first cell)
    let imgCell = null;
    const imgWrapper = li.querySelector('.cards-card-image');
    if (imgWrapper) {
      // Reference the <picture> element directly for robustness
      const pic = imgWrapper.querySelector('picture');
      if (pic) {
        imgCell = pic;
      } else {
        const img = imgWrapper.querySelector('img');
        if (img) imgCell = img;
      }
    }

    // Text (second cell)
    let textCell = [];
    const bodyWrapper = li.querySelector('.cards-card-body');
    if (bodyWrapper) {
      // Collect all child nodes preserving tags
      Array.from(bodyWrapper.childNodes).forEach((node) => {
        // Keep elements and non-empty text nodes
        if (node.nodeType === Node.ELEMENT_NODE) {
          textCell.push(node);
        } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          // Wrap non-empty text nodes in a span for semantic preservation
          const span = document.createElement('span');
          span.textContent = node.textContent.trim();
          textCell.push(span);
        }
      });
    }
    // If textCell has only one item, use it directly
    rows.push([
      imgCell,
      textCell.length === 1 ? textCell[0] : textCell
    ]);
  });
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
