/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main columns block (not the wrapper)
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get the immediate children of the columns block (these are the visual rows)
  const rows = Array.from(columnsBlock.children);

  // Prepare header row
  const headerRow = ['Columns (columns3)'];

  // We'll build two rows of two columns each, based on the visual layout and HTML structure
  // First visual row: left (text+list+button), right (image)
  // Second visual row: left (image), right (text+button)

  // --- First visual row ---
  const firstRow = rows[0];
  const firstRowChildren = Array.from(firstRow.children);

  // Left cell: text, list, button
  const leftCol = firstRowChildren[0];
  // Right cell: image
  const rightCol = firstRowChildren[1];
  // Defensive: find image in rightCol
  let rightImage = rightCol.querySelector('picture') || rightCol.querySelector('img');

  // --- Second visual row ---
  const secondRow = rows[1];
  const secondRowChildren = Array.from(secondRow.children);

  // Left cell: image
  const leftImageCol = secondRowChildren[0];
  let leftImage = leftImageCol.querySelector('picture') || leftImageCol.querySelector('img');

  // Right cell: text, button
  const rightTextCol = secondRowChildren[1];

  // Compose table rows
  const tableRows = [
    headerRow,
    [leftCol, rightImage],
    [leftImage, rightTextCol],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}
