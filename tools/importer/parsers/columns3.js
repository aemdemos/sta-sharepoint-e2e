/* global WebImporter */
export default function parse(element, { document }) {
  // Each :scope > div is a row; each row has two columns (divs)
  const rows = Array.from(element.querySelectorAll(':scope > div'));
  const headerRow = ['Columns'];
  const contentRows = [];

  rows.forEach(row => {
    // Each column in this row
    const columns = Array.from(row.querySelectorAll(':scope > div'));
    // Defensive: always two columns
    while (columns.length < 2) columns.push(document.createElement('div'));
    // For each column, gather all element and non-empty text nodes as content
    const cells = columns.map(col => {
      const children = Array.from(col.childNodes).filter(node =>
        node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())
      );
      if (children.length === 1) return children[0];
      return children.length > 1 ? children : '';
    });
    // Only rows with at least one non-empty cell
    if (cells[0] || cells[1]) contentRows.push(cells);
  });

  const cells = [headerRow, ...contentRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
