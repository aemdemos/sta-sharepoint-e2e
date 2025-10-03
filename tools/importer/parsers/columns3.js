/* global WebImporter */
export default function parse(element, { document }) {
  // Always use this header row
  const headerRow = ['Columns (columns3)'];

  // Helper: get direct child divs
  const getDirectDivs = (el) => Array.from(el.children).filter(child => child.tagName === 'DIV');

  // Get the two main rows (each is a div at the first level inside .columns.block)
  const mainRows = getDirectDivs(element);
  if (mainRows.length < 2) {
    // fallback: just header
    const table = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(table);
    return;
  }

  // Each mainRow has two columns visually: left and right
  // We want to build a table with two rows (after header), each with two columns
  const rows = [headerRow];
  for (let i = 0; i < 2; i++) {
    const rowDivs = getDirectDivs(mainRows[i]);
    if (rowDivs.length !== 2) {
      // fallback: just header
      const table = WebImporter.DOMUtils.createTable([headerRow], document);
      element.replaceWith(table);
      return;
    }
    // For each cell, collect all child nodes (including text, lists, buttons, images, etc.)
    const row = rowDivs.map(div => {
      // Always collect all child nodes (including images, text, buttons, etc.)
      const fragment = document.createDocumentFragment();
      Array.from(div.childNodes).forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) return;
        fragment.appendChild(node.cloneNode(true));
      });
      if (fragment.childNodes.length === 1) return fragment.firstChild;
      if (fragment.childNodes.length > 1) return Array.from(fragment.childNodes);
      return '';
    });
    rows.push(row);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
