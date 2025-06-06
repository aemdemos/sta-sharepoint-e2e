/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block (the part with the image and heading)
  const heroBlock = element.querySelector('.hero.block');
  let contentDiv;
  if (heroBlock) {
    // get the innermost div with the actual content
    const innerDivs = heroBlock.querySelectorAll(':scope > div > div');
    if (innerDivs.length > 0) {
      contentDiv = innerDivs[0];
    } else {
      // fallback, just use the first child div
      contentDiv = heroBlock.querySelector(':scope > div') || heroBlock;
    }
  } else {
    contentDiv = element;
  }

  // Extract the image (picture or img) - usually within a <p>
  let imageEl = null;
  let contentEls = [];
  for (const child of contentDiv.children) {
    if (!imageEl) {
      // look for picture or img in the first p
      const pic = child.querySelector && child.querySelector('picture');
      const img = child.querySelector && child.querySelector('img');
      if (pic) {
        imageEl = pic;
        continue;
      } else if (img) {
        imageEl = img;
        continue;
      }
    }
    // Collect headings and non-empty paragraphs
    if (
      child.tagName &&
      (child.tagName.match(/^H[1-6]$/) ||
        (child.tagName === 'P' && child.textContent.trim()))
    ) {
      contentEls.push(child);
    }
  }

  // If contentEls is empty, but there's a heading inside, add it
  if (contentEls.length === 0) {
    const h = contentDiv.querySelector('h1, h2, h3, h4, h5, h6');
    if (h) contentEls.push(h);
  }

  // Build the table: 1 column, 3 rows (header, image, content)
  const cells = [
    ['Hero'],
    [imageEl ? imageEl : ''],
    [contentEls.length > 0 ? contentEls : ''],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
