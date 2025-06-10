/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block content
  // The structure is: div.section > div.hero-wrapper > div.hero > div > div
  // Inside, expect picture (image), h1 (headline), and possibly others
  const heroBlock = element.querySelector('.hero');
  let contentDiv = heroBlock;
  // The hero block may have additional wrappers, drill down if needed
  if (heroBlock && heroBlock.firstElementChild && heroBlock.firstElementChild.firstElementChild) {
    contentDiv = heroBlock.firstElementChild.firstElementChild;
  }

  // Find the picture (background image)
  let imageEl = null;
  const picture = contentDiv.querySelector('picture');
  if (picture) {
    imageEl = picture;
  } else {
    const img = contentDiv.querySelector('img');
    if (img) imageEl = img;
  }

  // Gather all content that is NOT the image (after image)
  // We want all headings, subheadings, paragraphs, buttons, etc, after image
  // Collect in order, skipping <p> that only contains the picture/image
  const contentElements = [];
  Array.from(contentDiv.children).forEach((child) => {
    if (child.querySelector('picture')) return; // Skip image container
    // Skip empty <p>
    if (child.tagName.toLowerCase() === 'p' && child.textContent.trim() === '' && !child.querySelector('img')) return;
    contentElements.push(child);
  });

  // Create the table according to the required structure:
  // [ ['Hero'], [image], [text content elements] ]
  const rows = [
    ['Hero'],
    [imageEl || ''],
    [contentElements.length ? contentElements : ''],
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
