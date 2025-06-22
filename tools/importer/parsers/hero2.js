/* global WebImporter */
export default function parse(element, { document }) {
  // The structure is:
  // .section.hero-container > .hero-wrapper > .hero.block > div > div
  // All relevant hero content is inside .hero.block > div > div
  let contentRoot = element.querySelector('.hero.block > div > div') ||
                    element.querySelector('.hero.block > div') ||
                    element.querySelector('.hero.block') ||
                    element;

  // Header row: "Hero" exactly as in the markdown
  const rows = [['Hero']];

  // Second row: background image (picture or img), or empty if none
  let imageEl = contentRoot.querySelector('picture, img');
  rows.push([imageEl ? imageEl : '']);

  // Third row: text content (all headings, paragraphs, etc., after the image)
  // Gather children after the image, or all children except image-containing wrapper
  const children = Array.from(contentRoot.children);
  const textEls = [];
  for (let child of children) {
    // If this child contains the image node, skip it
    if (imageEl && (child === imageEl || child.contains(imageEl))) {
      continue;
    }
    // Only push if has meaningful content
    if (child.textContent && child.textContent.trim().length > 0) {
      textEls.push(child);
    }
  }
  // If nothing found but there is a heading node, add it
  if (textEls.length === 0) {
    // fallback: find first heading in contentRoot
    let heading = contentRoot.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      textEls.push(heading);
    }
  }
  rows.push([textEls.length ? textEls : '']);

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
