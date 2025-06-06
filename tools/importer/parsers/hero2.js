/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the innermost hero block content
  let contentDiv = element;
  // Drill down through wrappers (section, wrapper, block, etc.) to get to the inner content div
  while (
    contentDiv.children.length === 1 &&
    contentDiv.firstElementChild &&
    contentDiv.firstElementChild.tagName === 'DIV'
  ) {
    contentDiv = contentDiv.firstElementChild;
  }

  // Now expect children: paragraphs, headings, etc.
  // Find the first <picture> in a <p>
  let pictureEl = null;
  let textEls = [];
  for (const child of contentDiv.children) {
    if (pictureEl === null && child.tagName === 'P' && child.querySelector('picture')) {
      pictureEl = child.querySelector('picture');
    }
    // Extract headings (h1, h2, h3...) and non-empty paragraphs
    if (/^H[1-6]$/.test(child.tagName)) {
      textEls.push(child);
    } else if (child.tagName === 'P' && child.textContent.trim()) {
      // Avoid extracting the <picture> again as text if already found
      if (!child.querySelector('picture')) {
        textEls.push(child);
      }
    }
  }

  // Build the hero block table
  const rows = [];
  rows.push(['Hero']); // Header exactly as in the example
  rows.push([pictureEl ? pictureEl : '']);
  rows.push([textEls.length > 0 ? textEls : '']);

  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
