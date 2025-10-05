/* global WebImporter */
export default function parse(element, { document }) {
  // Get the direct children divs (each row in the columns block)
  const block = element.querySelector('.columns.block');
  if (!block) return;
  const rows = Array.from(block.children);
  // Defensive: Expecting two rows (top and bottom)
  // Each row has two children: left (text or image), right (image or text)

  // Header row
  const headerRow = ['Columns (columns3)'];

  // First row (top): left = text, right = image
  const topRow = rows[0];
  const topLeft = topRow.children[0];
  const topRight = topRow.children[1];

  // Left cell: all text content (p, ul, button)
  const topLeftContent = [];
  Array.from(topLeft.children).forEach((child) => {
    if (
      child.tagName === 'P' ||
      child.tagName === 'UL' ||
      child.classList.contains('button-container')
    ) {
      topLeftContent.push(child);
    }
  });

  // Right cell: image (picture)
  let topRightImage = topRight.querySelector('picture');
  if (!topRightImage) {
    topRightImage = topRight.querySelector('img');
  }

  // Second row (bottom): left = image, right = text
  const bottomRow = rows[1];
  const bottomLeft = bottomRow.children[0];
  const bottomRight = bottomRow.children[1];

  // Left cell: image (picture)
  let bottomLeftImage = bottomLeft.querySelector('picture');
  if (!bottomLeftImage) {
    bottomLeftImage = bottomLeft.querySelector('img');
  }

  // Right cell: text (p, button)
  const bottomRightContent = [];
  Array.from(bottomRight.children).forEach((child) => {
    if (
      child.tagName === 'P' ||
      child.classList.contains('button-container')
    ) {
      bottomRightContent.push(child);
    }
  });

  // Build table rows
  const row1 = [topLeftContent, topRightImage];
  const row2 = [bottomLeftImage, bottomRightContent];

  // Create table
  const cells = [headerRow, row1, row2];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
