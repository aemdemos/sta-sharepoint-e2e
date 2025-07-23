/* global WebImporter */
export default function parse(element, { document }) {
  // The block element has direct children <div> for each visual row
  // Each of those has two direct <div>s, representing the columns
  const headerRow = ['Columns'];
  const cells = [headerRow];

  // Get each direct child div of the block (the rows)
  const rowDivs = Array.from(element.children).filter((child) => child.tagName === 'DIV');

  for (const rowDiv of rowDivs) {
    // For each row, get its direct child divs (the columns)
    const colDivs = Array.from(rowDiv.children).filter((child) => child.tagName === 'DIV');
    // Only push rows with 2 columns (as in the example)
    if (colDivs.length === 2) {
      cells.push([colDivs[0], colDivs[1]]);
    }
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
