/* global WebImporter */
export default function parse(element, { document }) {
  // Find the deepest container with the actual hero content
  let contentRoot = element;
  while (
    contentRoot &&
    contentRoot.children.length === 1 &&
    contentRoot.firstElementChild.tagName === 'DIV'
  ) {
    contentRoot = contentRoot.firstElementChild;
  }

  // Get children: p (picture), h1, p (empty or ignored)
  const children = Array.from(contentRoot.children);

  // Find the picture (background image)
  let backgroundImage = null;
  for (const child of children) {
    if (child.tagName === 'P' && child.querySelector('picture')) {
      backgroundImage = child.querySelector('picture');
      break;
    }
  }

  // Compose the content cell for row 3: title, subheading, CTA (all in one cell)
  const contentCell = [];
  for (const child of children) {
    if (/^H[1-6]$/.test(child.tagName)) {
      contentCell.push(child);
    }
    // Optionally, add subheading (e.g., <p> with text, not empty, not picture)
    if (child.tagName === 'P' && child.textContent.trim() && !child.querySelector('picture')) {
      contentCell.push(child);
    }
    // Optionally, add CTA (e.g., <a> inside <p>)
    if (child.tagName === 'P' && child.querySelector('a')) {
      contentCell.push(child);
    }
  }

  // Ensure the third row's cell is always an array (even if only one element)
  const headerRow = ['Hero (hero2)'];
  const imageRow = [backgroundImage ? backgroundImage : ''];
  const textRow = [contentCell.length ? contentCell : ['']];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    textRow,
  ], document);

  element.replaceWith(table);
}
