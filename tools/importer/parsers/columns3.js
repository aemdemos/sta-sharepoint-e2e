/* global WebImporter */
export default function parse(element, { document }) {
  // Get all top-level row divs (children of the block)
  const rowDivs = Array.from(element.children);

  // Table header
  const headerRow = ['Columns (columns3)'];

  // Only add rows if both columns exist (avoid undefined cells)
  const cells = [headerRow];

  // First row: left is text, right is image
  if (rowDivs[0] && rowDivs[0].children[0] && rowDivs[0].children[1]) {
    cells.push([
      rowDivs[0].children[0], // text block
      rowDivs[0].children[1], // image block
    ]);
  }

  // Second row: left is image, right is text
  if (rowDivs[1] && rowDivs[1].children[0] && rowDivs[1].children[1]) {
    cells.push([
      rowDivs[1].children[0], // image block
      rowDivs[1].children[1], // text block
    ]);
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
