/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant columns from the element
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Define table header row
  const headerRow = ['Columns (columns3)'];

  const rows = columns.map((column) => {
    const cells = Array.from(column.querySelectorAll(':scope > div')).map((content) => {
      const elements = [];

      // Extract heading or block title
      const heading = content.querySelector('p:first-of-type');
      if (heading) {
        elements.push(heading);
      }

      // Extract list items
      const lists = content.querySelector('ul');
      if (lists) {
        elements.push(lists);
      }

      // Extract images
      const images = Array.from(content.querySelectorAll('img'));
      elements.push(...images);

      // Extract links
      const links = Array.from(content.querySelectorAll('a[href]'));
      elements.push(...links);

      // Extract paragraphs
      const paragraphs = Array.from(content.querySelectorAll('p:not(:first-of-type)')); 
      elements.push(...paragraphs);

      return elements;
    });
    return cells;
  });

  // Create table structure ensuring two columns per row
  const table = [
    headerRow,
    ...rows.map((row) => {
      const firstColumn = row[0] || [];
      const secondColumn = row[1] || [];
      return [firstColumn, secondColumn];
    })
  ];

  // Create block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(table, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}