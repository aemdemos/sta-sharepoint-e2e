/* global WebImporter */
export default function parse(element, { document }) {
  // Get the columns block's main content container
  const columnsBlock = element.querySelector('.columns.block');
  const headerRow = ['Columns (columns3)'];
  const tableRows = [];

  // Get the two visual rows (each is a direct child of .columns.block)
  const visualRows = Array.from(columnsBlock.children);

  // For each visual row, get its two columns
  visualRows.forEach(row => {
    const cols = Array.from(row.children);
    if (cols.length === 2) {
      tableRows.push([cols[0], cols[1]]);
    }
  });

  const cells = [headerRow, ...tableRows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
