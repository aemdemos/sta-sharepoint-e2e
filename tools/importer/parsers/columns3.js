/* global WebImporter */
 export default function parse(element, { document }) {
  const headerRow = ['Columns (columns3)'];

  const rows = [];

  // Get the column blocks
  const blocks = element.querySelectorAll(':scope > div > div');

  blocks.forEach((block) => {
    const cells = [];

    // Iterate through the immediate children of the block to process content
    const contents = block.querySelectorAll(':scope > div');
    contents.forEach((content) => {
      // If the content is an image column
      const picture = content.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          cells.push(img);
        }
      } else {
        // If the content is text and/or links
        const links = content.querySelectorAll('a');
        links.forEach((link) => {
          link.href = link.getAttribute('href') || link.getAttribute('src');
        });
        cells.push(content);
      }
    });

    rows.push(cells);
  });

  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  element.replaceWith(table);
}