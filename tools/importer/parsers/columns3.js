/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block[data-block-name="columns"]');
  if (!columnsBlock) return;

  // Get all content rows (immediate child divs)
  const rowDivs = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  if (!rowDivs.length) return;

  // Determine the number of columns by inspecting the first content row
  const firstCols = Array.from(rowDivs[0].querySelectorAll(':scope > div'));
  const numCols = firstCols.length;

  // The header row must have exactly one cell (per example)
  const tableRows = [['Columns']];

  // For each row, get the direct column divs and collect their content
  rowDivs.forEach((rowDiv) => {
    const colDivs = Array.from(rowDiv.querySelectorAll(':scope > div'));
    // For each colDiv, collect all its child nodes as a DocumentFragment
    const cells = colDivs.map((colDiv) => {
      const frag = document.createDocumentFragment();
      Array.from(colDiv.childNodes).forEach(node => frag.appendChild(node));
      return frag;
    });
    // If there are fewer columns than expected, pad with empty strings
    while (cells.length < numCols) {
      cells.push('');
    }
    tableRows.push(cells);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace original element with the block table
  element.replaceWith(table);
}
