/* global WebImporter */
export default function parse(element, { document }) {
  // Find the innermost content div
  let contentDiv = element;
  // .hero-wrapper > .hero.block > div > div
  let inner = contentDiv.querySelector(':scope > .hero-wrapper');
  if (inner) inner = inner.querySelector(':scope > .hero.block');
  if (inner) inner = inner.querySelector(':scope > div');
  if (inner) inner = inner.querySelector(':scope > div');

  // If structure isn't found, bail out
  if (!inner) {
    // fallback: try flattening and extracting what we can
    const cells = [['Hero'], [''], [element]];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
    return;
  }

  // Row 2: background image (picture or img)
  let bgImg = null;
  // Look for a <picture> tag, prefer over <img>
  bgImg = inner.querySelector('picture') || inner.querySelector('img');

  // Row 3: everything else except the image
  const content = [];
  Array.from(inner.children).forEach(child => {
    // If child contains the background image, skip
    if (
      child.querySelector('picture') === bgImg ||
      child.querySelector('img') === bgImg ||
      child === bgImg ||
      (child.tagName === 'P' && child.querySelector('picture, img'))
    ) {
      return;
    }
    // Ignore empty <p> tags
    if (child.tagName === 'P' && child.textContent.trim() === '') {
      return;
    }
    content.push(child);
  });

  // Compose the table
  // Table header row must be exactly 'Hero'
  const cells = [
    ['Hero'],
    [bgImg ? bgImg : ''],
    [content.length === 1 ? content[0] : content]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
