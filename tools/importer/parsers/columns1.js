/* global WebImporter */
export default function parse(element, { document }) {
  // Find the nav inside the header
  const nav = element.querySelector('nav');
  if (!nav) return;

  // Extract the three major nav sections for columns: brand, sections, tools
  const brandSection = nav.querySelector('.nav-brand') || document.createDocumentFragment();
  const sectionsSection = nav.querySelector('.nav-sections') || document.createDocumentFragment();
  const toolsSection = nav.querySelector('.nav-tools') || document.createDocumentFragment();

  // Compose the columns block table: single-cell header, then three-column content row
  const cells = [
    ['Columns (columns1)'],
    [brandSection, sectionsSection, toolsSection]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
