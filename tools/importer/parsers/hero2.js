/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block
  const heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) return;

  // The hero content is inside the first nested div > div
  const heroContent = heroBlock.querySelector(':scope > div > div');
  if (!heroContent) return;

  // Get the children of the content div
  const children = Array.from(heroContent.children);

  // The image is always inside the first <p> as a <picture>
  let pictureEl = null;
  if (children[0] && children[0].querySelector('picture')) {
    pictureEl = children[0].querySelector('picture');
  }

  // Gather all the content after the picture (the rest of the children)
  // Only include non-empty elements
  const contentElements = [];
  for (let i = 1; i < children.length; i++) {
    if (children[i].textContent.trim() !== '' || children[i].querySelector('a')) {
      contentElements.push(children[i]);
    }
  }

  // If there are no content elements, keep the row as an empty string for structure
  const rows = [
    ['Hero'],
    [pictureEl || ''],
    [contentElements.length ? contentElements : '']
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
