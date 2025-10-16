/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns (columns3)
  const headerRow = ['Columns (columns3)'];

  // Find the main block wrapper (should be the direct child with columns block)
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) {
    // fallback: just wrap the whole element in a single cell
    const block = WebImporter.DOMUtils.createTable([
      headerRow,
      [element]
    ], document);
    element.replaceWith(block);
    return;
  }

  // Get all direct children of columnsBlock (each represents a row)
  const rowsDivs = Array.from(columnsBlock.children);

  // Defensive: If structure is unexpected, fallback
  if (rowsDivs.length < 2) {
    const block = WebImporter.DOMUtils.createTable([
      headerRow,
      [columnsBlock]
    ], document);
    element.replaceWith(block);
    return;
  }

  // Each rowDiv contains two columns (divs)
  function getRowCells(rowDiv) {
    // Only include direct children that are divs
    return Array.from(rowDiv.children).filter(child => child.tagName === 'DIV');
  }

  const firstRowCells = getRowCells(rowsDivs[0]);
  const secondRowCells = getRowCells(rowsDivs[1]);

  // Defensive: ensure both rows have two columns
  function padRow(row) {
    if (row.length === 2) return row;
    if (row.length === 1) return [row[0], document.createElement('div')];
    if (row.length === 0) return [document.createElement('div'), document.createElement('div')];
    return row.slice(0, 2);
  }

  const rows = [
    headerRow,
    padRow(firstRowCells),
    padRow(secondRowCells)
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}