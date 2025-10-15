/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Columns (columns3)'];
  const rows = [];

  // Get the main block (should be .columns.block)
  const block = element.querySelector('.columns.block');
  if (!block) return;

  // Get the two main horizontal sections (each is a row in the table)
  const sectionDivs = Array.from(block.querySelectorAll(':scope > div'));
  if (sectionDivs.length < 2) return;

  // First row: left = text, right = image
  {
    const cols = Array.from(sectionDivs[0].querySelectorAll(':scope > div'));
    if (cols.length === 2) {
      // left: text, right: image
      const leftCell = cols[0];
      // right: image (may be wrapped in .columns-img-col)
      let rightCell = cols[1];
      const imgCol = rightCell.querySelector('.columns-img-col');
      if (imgCol) rightCell = imgCol;
      rows.push([leftCell, rightCell]);
    }
  }

  // Second row: left = image, right = text
  {
    const cols = Array.from(sectionDivs[1].querySelectorAll(':scope > div'));
    if (cols.length === 2) {
      // left: image (may be wrapped in .columns-img-col)
      let leftCell = cols[0];
      const imgCol = leftCell.querySelector('.columns-img-col');
      if (imgCol) leftCell = imgCol;
      // right: text
      const rightCell = cols[1];
      rows.push([leftCell, rightCell]);
    }
  }

  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
