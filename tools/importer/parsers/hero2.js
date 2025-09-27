/* global WebImporter */
export default function parse(element, { document }) {
  // Find the deepest div that contains the hero content
  let contentDiv = element;
  while (contentDiv && contentDiv.children.length === 1 && contentDiv.firstElementChild.tagName === 'DIV') {
    contentDiv = contentDiv.firstElementChild;
  }

  // Find the first <picture> (background image)
  let imageEl = contentDiv.querySelector('picture');

  // Find all headings and non-empty paragraphs (for text content)
  let textNodes = [];
  Array.from(contentDiv.children).forEach((child) => {
    if (/^H[1-6]$/.test(child.tagName)) {
      textNodes.push(child);
    } else if (child.tagName === 'P' && child.textContent.trim() !== '') {
      textNodes.push(child);
    }
  });

  // Compose rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imageEl ? imageEl : ''];
  const textRow = [textNodes.length > 0 ? textNodes : ''];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    textRow,
  ], document);
  element.replaceWith(table);
}
