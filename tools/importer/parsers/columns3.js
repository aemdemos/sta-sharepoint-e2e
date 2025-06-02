/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the columns wrapper
  const columns = element.querySelectorAll(':scope > div');

  const headerRow = ['Columns (columns3)'];

  const rows = [];

  // Process each column
  columns.forEach((column) => {
    const columnContent = [];

    const children = column.querySelectorAll(':scope > div');
    children.forEach((child) => {
      if (child.querySelector('img')) {
        // Extract image element
        columnContent.push(child.querySelector('img'));
      } else if (child.querySelector('ul')) {
        // Extract list content
        columnContent.push(child.querySelector('ul'));
      } else if (child.querySelector('a.button')) {
        // Extract button link
        const link = child.querySelector('a.button');
        columnContent.push(link);
      } else {
        // Extract other content (e.g., paragraphs)
        columnContent.push(...child.childNodes);
      }
    });

    rows.push(columnContent);
  });

  const tableData = [headerRow, ...rows];

  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}