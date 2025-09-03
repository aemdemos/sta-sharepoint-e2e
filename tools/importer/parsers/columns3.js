/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure we have the expected structure
  if (!element) return;

  // Header row as required
  const headerRow = ['Columns (columns3)'];

  // Get all immediate children of the columns block (these are the rows)
  // The structure is: columns-wrapper > columns.block > div > div (each column group)
  const columnGroups = Array.from(element.querySelectorAll(':scope > div > div'));

  // Defensive: if no column groups found, do nothing
  if (!columnGroups.length) return;

  // Build the second row: each cell is a column
  // For this block, there are two column groups (each is a div)
  // Each column group may contain one or two child divs (content and/or image)
  // We want to extract the content for each column and place it in a cell

  // For each column group, collect its direct children as a single cell
  const secondRow = columnGroups.map((group) => {
    // Get all immediate children of the group
    const children = Array.from(group.children);
    // If only one child, use it directly
    if (children.length === 1) {
      return children[0];
    }
    // If multiple children, put them all in an array
    return children;
  });

  // Compose the table data
  const cells = [headerRow, secondRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
