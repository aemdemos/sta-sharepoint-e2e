/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row
  const headerRow = ['Columns (columns3)'];

  // Extract the immediate child blocks
  const blocks = Array.from(element.querySelectorAll(':scope > div'));

  // Map each block into rows for the table
  const rows = blocks.map((block) => {
    const cells = Array.from(block.querySelectorAll(':scope > div'));
    return cells.map((cell) => {
      const content = [];

      // Extract images
      const picture = cell.querySelector('picture');
      const img = picture?.querySelector('img');
      if (img) {
        content.push(img);
      }

      // Extract lists
      const list = cell.querySelector('ul');
      if (list) {
        content.push(list);
      }

      // Extract text paragraphs
      const paragraphs = Array.from(cell.querySelectorAll('p')).filter((p) => p.textContent.trim() !== '' && !p.classList.contains('button-container'));
      content.push(...paragraphs);

      // Extract links
      const links = Array.from(cell.querySelectorAll('a')).filter((link) => link.textContent.trim() !== '');
      content.push(...links);

      return content.length > 0 ? content : null;
    });
  });

  // Create the table structure dynamically
  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}