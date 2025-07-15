/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block root (may be section, may be .hero.block)
  let heroRoot = element.querySelector('.hero.block') || element;

  // Dig down to the element that holds main block content (often div > div)
  // This handles: <div class="hero block"><div><div>...</div></div></div>
  let contentContainer = heroRoot;
  // Try to find the main content container (ignore wrappers)
  const possibleContainers = heroRoot.querySelectorAll(':scope > div > div, :scope > div');
  for (const pc of possibleContainers) {
    // If child contains an <h1> or <picture>, it's likely our content container
    if (pc.querySelector('h1, picture, img')) {
      contentContainer = pc;
      break;
    }
  }

  // Find the first picture or img (for the background image row)
  let imageCell = null;
  let pictureOrImg = contentContainer.querySelector('picture, img');
  if (pictureOrImg) {
    // Use its parent <p> if one exists (to preserve structure)
    const parentP = pictureOrImg.closest('p');
    imageCell = parentP && parentP.parentElement === contentContainer ? parentP : pictureOrImg;
  }

  // For the content row (heading, subheading, paragraph, etc.),
  // collect everything except the image row
  let contentEls = [];
  for (const child of contentContainer.children) {
    // Don't include the image cell (or its parent <p>, if used)
    if (imageCell && child === imageCell) continue;
    if (imageCell && child.contains && child.contains(imageCell)) continue;
    // Exclude empty <p> that may be present
    if (child.tagName === 'P' && child.textContent.trim() === '' && child.children.length === 0) continue;
    contentEls.push(child);
  }
  // If nothing found, fallback to all h1-h6/p under contentContainer (except image)
  if (contentEls.length === 0) {
    contentEls = Array.from(contentContainer.querySelectorAll('h1, h2, h3, h4, h5, h6, p')).filter((el) => {
      if (imageCell && (el === imageCell || el.contains(imageCell))) return false;
      // Exclude empty <p>
      if (el.tagName === 'P' && el.textContent.trim() === '' && el.children.length === 0) return false;
      return true;
    });
  }

  // Build the table rows per the example: header, image, then content
  const rows = [
    ['Hero'],
    [imageCell].filter(Boolean),
    [contentEls.length > 1 ? contentEls : (contentEls[0] || '')], // put all content els into single cell, or blank
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the element
  element.replaceWith(table);
}
