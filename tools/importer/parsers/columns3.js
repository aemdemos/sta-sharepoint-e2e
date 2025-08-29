/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two column rows
  const colRows = Array.from(element.querySelectorAll(':scope > div > div'));
  if (colRows.length < 2) return;
  // Collect columns for both rows
  const firstRowCols = Array.from(colRows[0].children);
  const secondRowCols = Array.from(colRows[1].children);
  if (firstRowCols.length < 2 || secondRowCols.length < 2) return;
  // Each column stacks upper and lower cell
  const leftColContent = [];
  if (firstRowCols[0]) leftColContent.push(firstRowCols[0]);
  if (secondRowCols[0]) leftColContent.push(secondRowCols[0]);
  const rightColContent = [];
  if (firstRowCols[1]) rightColContent.push(firstRowCols[1]);
  if (secondRowCols[1]) rightColContent.push(secondRowCols[1]);
  // Create header row with ONLY 1 cell exactly as in the example
  const tableRows = [
    ['Columns (columns3)'],
    [leftColContent, rightColContent],
  ];
  // Create and replace
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
