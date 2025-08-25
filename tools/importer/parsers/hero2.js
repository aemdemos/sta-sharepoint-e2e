/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner content of the hero block
  let contentWrapper = element;
  // Traverse to .hero-wrapper
  const heroWrapper = contentWrapper.querySelector(':scope > .hero-wrapper');
  if (heroWrapper) contentWrapper = heroWrapper;
  // Traverse to .hero.block
  const heroBlock = contentWrapper.querySelector(':scope > .hero.block');
  if (heroBlock) contentWrapper = heroBlock;
  // The real content is in the first inner div(s)
  let contentDiv = contentWrapper;
  let found = false;
  const divChildren = contentWrapper.querySelectorAll(':scope > div');
  if (divChildren.length > 0) {
    contentDiv = divChildren[0];
    found = true;
    // Check if there's another layer of div
    const moreDivs = contentDiv.querySelectorAll(':scope > div');
    if (moreDivs.length > 0) {
      contentDiv = moreDivs[0];
    }
  }
  // Now contentDiv contains direct child nodes: p (picture), h1, p, etc.
  // Find the image (picture/img)
  let imageEl = null;
  let foundImage = false;
  Array.from(contentDiv.children).forEach((child) => {
    if (!foundImage && child.tagName === 'P' && child.querySelector('picture')) {
      imageEl = child.querySelector('img');
      foundImage = true;
    }
  });
  // Get the rest of the content (excluding the image paragraph, and ignoring empty p's)
  const contentEls = [];
  Array.from(contentDiv.children).forEach((child) => {
    if (child.tagName === 'P' && child.querySelector('picture')) {
      return; // skip this row (the image row)
    }
    // skip empty paragraphs
    if (child.tagName === 'P' && (!child.textContent || child.textContent.trim() === '')) {
      return;
    }
    contentEls.push(child);
  });
  // Compose table
  const cells = [
    ['Hero'],
    [imageEl ? imageEl : ''],
    [contentEls.length > 0 ? contentEls : '']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
