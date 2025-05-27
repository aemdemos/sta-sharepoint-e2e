/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Header row
  rows.push(['Columns (columns3)']);

  // Content rows
  const children = element.querySelectorAll(':scope > div > div');

  children.forEach((child) => {
    const columns = [];
    const innerChildren = child.querySelectorAll(':scope > div');
    innerChildren.forEach((innerChild) => {
      const picture = innerChild.querySelector('picture');
      if (picture) {
        columns.push(picture);
      } else {
        const content = [];
        innerChild.childNodes.forEach((node) => {
          content.push(node);
        });
        columns.push(content);
      }
    });
    rows.push(columns);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}