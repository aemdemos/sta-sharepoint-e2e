/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate child divs
  const getDirectDivs = (el) => Array.from(el.querySelectorAll(':scope > div'));

  // Find the main columns block (may be wrapped)
  let columnsBlock = element;
  // Defensive: if wrapper exists, find the block inside
  if (columnsBlock.classList.contains('columns-wrapper')) {
    columnsBlock = columnsBlock.querySelector('.columns.block');
  }

  // Get the top-level column groups (each is a row visually)
  const rowGroups = getDirectDivs(columnsBlock);

  // Header row as specified
  const headerRow = ['Columns (columns3)'];

  // We'll build rows for the table
  const tableRows = [headerRow];

  // Each rowGroup corresponds to a visual row in the screenshot
  rowGroups.forEach((rowGroup) => {
    // Each rowGroup has 2 direct children (columns)
    const columns = getDirectDivs(rowGroup);
    const rowCells = columns.map((col) => {
      // If this column is an image column, use the image
      const imgCol = col.classList.contains('columns-img-col');
      if (imgCol) {
        // Use the picture element directly
        const picture = col.querySelector('picture');
        if (picture) return picture;
      }
      // Otherwise, use all child elements as a fragment
      // (text, lists, buttons, etc)
      // Defensive: collect all children
      const children = Array.from(col.childNodes).filter((node) => {
        // Only include element nodes and non-empty text nodes
        return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim());
      });
      return children.length === 1 ? children[0] : children;
    });
    tableRows.push(rowCells);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace the original element
  element.replaceWith(block);
}
