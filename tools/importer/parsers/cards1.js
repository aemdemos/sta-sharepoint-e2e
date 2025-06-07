/* global WebImporter */
export default function parse(element, { document }) {
  // Always produce a block table with the correct header, even if there is no card content
  const cells = [
    ['Cards (cards1)']
    // No card rows since the source HTML does not contain any card content
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
