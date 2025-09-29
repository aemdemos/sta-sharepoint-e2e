/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns3)'];

  // Find the columns block inner structure
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) {
    const block = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(block);
    return;
  }

  // Each visual row is a direct child of .columns.block
  const visualRows = Array.from(columnsBlock.children);
  const rows = [headerRow];

  visualRows.forEach((visualRow) => {
    // Each visual row has two columns (divs)
    const cols = Array.from(visualRow.children);
    if (cols.length === 2) {
      // Always include ALL content from each column, not just specific tags
      const cell1Content = Array.from(cols[0].childNodes).map(node => node.cloneNode(true));
      const cell2Content = Array.from(cols[1].childNodes).map(node => node.cloneNode(true));
      rows.push([cell1Content, cell2Content]);
    }
  });

  // Ensure all rows after header have same number of columns
  const maxCols = Math.max(...rows.slice(1).map(r => r.length));
  rows.forEach((row, i) => {
    if (i > 0 && row.length < maxCols) {
      while (row.length < maxCols) row.push('');
    }
  });

  // Remove empty rows (besides header)
  const filteredRows = [rows[0], ...rows.slice(1).filter(row => row.some(cell => {
    if (Array.isArray(cell)) return cell.length > 0 && cell.some(n => n.textContent.trim() || n.nodeName === 'PICTURE' || n.nodeName === 'IMG');
    if (typeof cell === 'string') return cell.trim() !== '';
    if (cell && cell.childNodes) return cell.childNodes.length > 0;
    return false;
  })) ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(filteredRows, document);
  element.replaceWith(block);
}
