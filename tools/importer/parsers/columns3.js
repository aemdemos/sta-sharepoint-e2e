/* global WebImporter */
export default function parse(element, { document }) {
  // The header row: exactly one cell ('Columns')
  const headerRow = ['Columns'];

  // Each row in the block is a visual row (should become a data row)
  // Each row has multiple columns (should become cells in its row)
  const visualRows = Array.from(element.querySelectorAll(':scope > div'));

  const dataRows = visualRows.map(row => {
    // Each column is a direct child of the visual row
    const cols = Array.from(row.querySelectorAll(':scope > div'));
    // For each column, grab all non-empty nodes
    return cols.map(col => {
      const children = Array.from(col.childNodes).filter(node => node.nodeType !== Node.TEXT_NODE || node.textContent.trim());
      if (children.length === 0) return '';
      if (children.length === 1) return children[0];
      return children;
    });
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...dataRows
  ], document);

  element.replaceWith(table);
}
