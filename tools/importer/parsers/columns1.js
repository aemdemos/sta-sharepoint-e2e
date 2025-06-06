/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure .nav-wrapper exists
  const navWrapper = element.querySelector('.nav-wrapper');
  if (!navWrapper) return;

  const nav = navWrapper.querySelector('nav');
  if (!nav) return;

  // Extract the main navigation columns in order:
  // 1. Brand (left)
  // 2. Sections (center)
  // 3. Tools (right)
  const brand = nav.querySelector('.nav-brand');
  const sections = nav.querySelector('.nav-sections');
  const tools = nav.querySelector('.nav-tools');

  // Only include columns that exist (could be empty if not present)
  const columns = [];
  if (brand) columns.push(brand);
  if (sections) columns.push(sections);
  if (tools) columns.push(tools);

  // Per the markdown example, the header row is a single cell,
  // and each row after should be a single cell containing all columns as an array.
  const cells = [
    ['Columns (columns1)'],
    [columns]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
