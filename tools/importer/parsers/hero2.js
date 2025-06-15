/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main hero content
  let heroContentWrapper = element.querySelector('.hero-wrapper .hero.block > div > div');
  if (!heroContentWrapper) {
    const heroBlockDiv = element.querySelector('.hero-wrapper .hero.block > div');
    heroContentWrapper = heroBlockDiv || element;
  }

  // Find the image and the first h1 (heading)
  let imageEl = null;
  let headingEl = null;
  const children = Array.from(heroContentWrapper.children);
  for (const child of children) {
    if (!imageEl && child.tagName === 'P' && child.querySelector('picture')) {
      // Use the <picture> element directly (not the wrapping <p>)
      imageEl = child.querySelector('picture');
    }
    if (!headingEl && child.tagName === 'H1' && child.textContent.trim()) {
      headingEl = child;
    }
  }

  // Table rows: header, image, heading
  const rows = [
    ['Hero'],
    [imageEl ? imageEl : ''],
    [headingEl ? headingEl : '']
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
