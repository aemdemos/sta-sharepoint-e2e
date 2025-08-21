/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the hero block content
  let heroContent;
  // The deepest content of hero: .hero.block > div > div
  const heroBlock = element.querySelector('.hero.block');
  if (heroBlock) {
    // Often .hero.block > div > div
    const firstDiv = heroBlock.querySelector(':scope > div');
    if (firstDiv) {
      const secondDiv = firstDiv.querySelector(':scope > div');
      if (secondDiv) {
        heroContent = secondDiv;
      } else {
        heroContent = firstDiv;
      }
    } else {
      heroContent = heroBlock;
    }
  } else {
    heroContent = element;
  }

  // Find the image (picture or img)
  let imgEl = null;
  const picture = heroContent.querySelector('picture');
  if (picture) {
    imgEl = picture;
  } else {
    const img = heroContent.querySelector('img');
    if (img) imgEl = img;
  }

  // Find all textual content (h1, h2, h3, p, etc), skipping empty paragraphs and already-extracted image
  const textEls = [];
  Array.from(heroContent.children).forEach((child) => {
    // Skip <picture> or <img> elements
    if (child.tagName.toLowerCase() === 'picture') return;
    if (child.tagName.toLowerCase() === 'p' && child.querySelector('picture, img')) return;
    // Skip empty paragraphs
    if (child.tagName.toLowerCase() === 'p' && !child.textContent.trim()) return;
    textEls.push(child);
  });

  // Build table rows
  const rows = [
    ['Hero'], // Header row must be exactly "Hero"
    [imgEl ? imgEl : ''],
    [textEls.length ? textEls : ''],
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
