/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get the first direct descendant matching tag
  function getFirstDescendant(el, tag) {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (node) => node.tagName === tag.toUpperCase() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
    });
    return walker.nextNode();
  }

  // 1. Header row
  const headerRow = ['Hero (hero2)'];

  // 2. Background image row (optional)
  // Find the first <img> in the element (inside <picture>), if any
  let imgEl = null;
  const pictures = element.querySelectorAll('picture');
  if (pictures.length > 0) {
    imgEl = pictures[0].querySelector('img');
  }
  const imageRow = [imgEl ? imgEl : ''];

  // 3. Content row: heading, subheading, CTA
  // For this source, only a heading is present
  // Find the first h1-h3, and any paragraphs after it (excluding the image <p>)
  let contentEls = [];
  // Find all h1-h3 and p, but skip the <p> that contains the <picture>
  const allPs = Array.from(element.querySelectorAll('p'));
  let imageP = null;
  for (const p of allPs) {
    if (p.querySelector('picture')) {
      imageP = p;
      break;
    }
  }
  // Get all h1-h3
  const headings = Array.from(element.querySelectorAll('h1, h2, h3'));
  if (headings.length > 0) {
    contentEls.push(headings[0]);
  }
  // Get any <p> that is not the image <p>
  for (const p of allPs) {
    if (p !== imageP && p.textContent.trim().length > 0) {
      contentEls.push(p);
    }
  }
  // If nothing found, leave cell blank
  const contentRow = [contentEls.length ? contentEls : ''];

  // Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
