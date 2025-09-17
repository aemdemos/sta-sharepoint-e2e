/* global WebImporter */
export default function parse(element, { document }) {
  // Traverse to the innermost content div
  let contentDiv = element;
  for (let i = 0; i < 3; i++) {
    if (contentDiv && contentDiv.children.length === 1) {
      contentDiv = contentDiv.children[0];
    }
  }

  // Find the <picture> (image)
  const imageEl = contentDiv.querySelector('picture');

  // Gather all heading and paragraph elements for the content cell
  const contentCell = [];
  Array.from(contentDiv.children).forEach((child) => {
    if (/^H[1-6]$/.test(child.tagName)) {
      contentCell.push(child);
    } else if (child.tagName === 'P' && !child.querySelector('picture')) {
      if (child.textContent.trim()) {
        contentCell.push(child);
      }
    }
  });

  // Build table: always 3 rows, but only add third row if there's actual content
  const cells = [
    ['Hero (hero2)'],
    [imageEl ? imageEl : ''],
  ];
  if (contentCell.length > 0) {
    cells.push([contentCell.length === 1 ? contentCell[0] : contentCell]);
  }

  // If there's no content for the third row, do NOT add an empty row

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
