/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the hero image and heading inside the block
  // The structure is: element > .hero-wrapper > .hero.block > div > div > ...
  let heroImg = null;
  let heroHeading = null;

  // Find the deepest content container
  let contentDiv = element;
  // Step into .hero-wrapper if present
  const wrapper = element.querySelector('.hero-wrapper');
  if (wrapper) {
    contentDiv = wrapper;
  }
  // Step into .hero.block if present
  const heroBlock = contentDiv.querySelector('.hero.block');
  if (heroBlock) {
    contentDiv = heroBlock;
  }
  // Step into the first div > div
  const innerDiv = contentDiv.querySelector('div > div');
  if (innerDiv) {
    contentDiv = innerDiv;
  }

  // Find the image (picture or img)
  const picture = contentDiv.querySelector('picture');
  if (picture) {
    heroImg = picture;
  } else {
    // fallback: direct img
    const img = contentDiv.querySelector('img');
    if (img) heroImg = img;
  }

  // Find the heading (h1, h2, h3)
  heroHeading = contentDiv.querySelector('h1, h2, h3');

  // Build table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [heroImg ? heroImg : ''];
  // Compose content cell: heading (required), subheading/paragraphs (optional)
  const contentCell = [];
  if (heroHeading) contentCell.push(heroHeading);
  // Find any paragraphs after heading
  const paragraphs = [];
  let foundHeading = false;
  for (const child of contentDiv.children) {
    if (child === heroHeading) {
      foundHeading = true;
      continue;
    }
    if (foundHeading && child.tagName === 'P' && child.textContent.trim()) {
      paragraphs.push(child);
    }
  }
  if (paragraphs.length) contentCell.push(...paragraphs);

  const contentRow = [contentCell.length ? contentCell : ''];

  // Compose table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
