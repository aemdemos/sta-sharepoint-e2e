/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns3)'];

  // Get all immediate child elements of the block
  const rows = Array.from(element.querySelectorAll(':scope > div'));

  const cells = [headerRow];

  rows.forEach((row) => {
    const columns = Array.from(row.querySelectorAll(':scope > div'));
    const parsedRow = columns.map((col) => {
      const content = [];

      const img = col.querySelector('img');
      if (img) {
        content.push(img);
      }

      const list = col.querySelector('ul');
      if (list) {
        content.push(list);
      }

      const paragraph = col.querySelector('p:not(.button-container)');
      if (paragraph) {
        content.push(paragraph);
      }

      const button = col.querySelector('.button-container a');
      if (button) {
        const link = document.createElement('a');
        link.href = button.href;
        link.textContent = button.title;
        content.push(link);
      }

      const buttonSecondary = col.querySelector('.button-container em a');
      if (buttonSecondary) {
        const secondaryLink = document.createElement('a');
        secondaryLink.href = buttonSecondary.href;
        secondaryLink.textContent = buttonSecondary.title;
        content.push(secondaryLink);
      }

      // Combine all content into a single cell for the column
      return content;
    });

    // Add the row with combined content for each column to the cells array
    cells.push(parsedRow);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}