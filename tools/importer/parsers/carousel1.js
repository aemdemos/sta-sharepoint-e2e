/* global WebImporter */
export default function parse(element, { document }) {
  // The provided HTML is a header/navigation bar, not a Carousel. There are no carousel slides or images to extract.
  // According to instructions: preserve the block header and output an empty block table for this input.

  // Header must match the example precisely
  const headerRow = ['Carousel (carousel1)'];
  const cells = [headerRow];

  // Table is created with only the header row, as no slide rows are present.
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
