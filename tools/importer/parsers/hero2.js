/* global WebImporter */
export default function parse(element, { document }) {
  // Find the image (picture or img) and the heading content
  let imageEl = null;
  let contentEls = [];

  // The hero block structure is typically: <div><div><p><picture>...</picture></p><h1>...</h1><p>...</p></div></div>
  // Find the first <picture> or <img>
  imageEl = element.querySelector('picture, img');

  // Find all heading and non-empty paragraph elements that are not the image container
  // Only consider direct children of the deepest div (the one containing the actual content)
  let contentContainer = element;
  let deepestDiv = element;
  while (deepestDiv && deepestDiv.querySelector(':scope > div')) {
    deepestDiv = deepestDiv.querySelector(':scope > div');
    if (deepestDiv) contentContainer = deepestDiv;
  }

  // Now, collect headings and non-empty paragraphs (excluding the <p> containing the image)
  const allChildren = Array.from(contentContainer.children);
  for (const child of allChildren) {
    // Skip the <p> that contains the image
    if (child.tagName === 'P' && child.querySelector('picture, img')) continue;
    // Only include headings and non-empty paragraphs
    if (/^H[1-6]$/.test(child.tagName) || (child.tagName === 'P' && child.textContent.trim())) {
      contentEls.push(child);
    }
  }

  // Build the table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [contentEls.length ? contentEls : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
