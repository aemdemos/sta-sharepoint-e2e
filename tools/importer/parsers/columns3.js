/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main columns block (should be .columns.block)
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get the two main rows (each row is a direct child div of .columns.block)
  const rows = Array.from(columnsBlock.children);
  if (rows.length < 2) return;

  // Build header row
  const headerRow = ['Columns (columns3)'];

  // --- First row ---
  // Left column: text content ("Columns block", list, button)
  const leftCol1 = rows[0].children[0];
  const leftCol1Content = Array.from(leftCol1.childNodes);
  // Right column: image (green double helix)
  const rightCol1 = rows[0].children[1];
  const img1 = rightCol1.querySelector('picture');

  // --- Second row ---
  // Left column: image (yellow double helix)
  const leftCol2 = rows[1].children[0];
  const img2 = leftCol2.querySelector('picture');
  // Right column: text ("Or you can just view the preview", button)
  const rightCol2 = rows[1].children[1];
  const rightCol2Content = Array.from(rightCol2.childNodes);

  // Compose table rows
  const row1 = [leftCol1Content, img1];
  const row2 = [img2, rightCol2Content];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row1,
    row2,
  ], document);

  // Replace element
  element.replaceWith(table);
}
