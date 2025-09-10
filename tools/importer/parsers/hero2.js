/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the hero image and heading
  // The structure is: element > .hero-wrapper > .hero.block > div > div > [content]
  let heroContent;
  // Find the deepest content div
  const wrappers = element.querySelectorAll(':scope > .hero-wrapper > .hero.block > div > div');
  if (wrappers.length > 0) {
    heroContent = wrappers[0];
  } else {
    // fallback: try to find the first div with an image and heading
    heroContent = element.querySelector('h1')?.parentElement || element;
  }

  // Find the image (picture or img)
  let imageEl = null;
  const picture = heroContent.querySelector('picture');
  if (picture) {
    imageEl = picture;
  } else {
    // fallback: find img
    const img = heroContent.querySelector('img');
    if (img) imageEl = img;
  }

  // Find the heading (h1)
  const heading = heroContent.querySelector('h1');

  // Compose table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [];
  // Only add heading if present
  if (heading) contentRow.push(heading);
  // If there are other paragraphs or CTAs, add them here (none in this example)
  // If nothing, add empty string to keep 1 column
  if (contentRow.length === 0) contentRow.push('');

  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
