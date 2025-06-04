/* global WebImporter */
export default function parse(element, { document }) {
  // Only create a columns block if the element is a real columns block, not a header/nav
  // Use a heuristic: columns block contains only direct child <div>s (for columns),
  // and does not have classes like 'header', 'nav', etc.
  const className = element.className || '';
  const forbidden = ['header', 'nav', 'navbar', 'header-wrapper'];
  if (forbidden.some(cls => className.includes(cls))) {
    // Do not process navigation/header elements as columns blocks
    return;
  }
  // Check if it contains at least 2 direct div children (columns pattern)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) {
    // Not a real columns block
    return;
  }
  // Build the columns block table
  const headerRow = ['Columns (columns1)'];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columns,
  ], document);
  element.replaceWith(table);
}
