/* global WebImporter */
export default function parse(element, { document }) {
  // The example HTML is a site header, not an embed. There is no video/image/link to extract.
  // The Embed (embedVideo1) block requires a table with the header and a second row with the link and optional poster image.
  // Since there is no video embed in the source, this block will be output as an empty embed block with the correct structure.

  // Block header row
  const headerRow = ['Embed (embedVideo1)'];
  // Content row (empty)
  const contentRow = [''];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
