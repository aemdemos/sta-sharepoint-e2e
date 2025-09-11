/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the image (background) and the text content
  // The structure is: element > div > div > p (picture), h1, p

  // Find the first div inside the block (should contain all content)
  const contentWrapper = element.querySelector(':scope > div > div');
  if (!contentWrapper) return;

  // Find the <picture> (background image)
  const pictureParagraph = contentWrapper.querySelector('p');
  let pictureEl = null;
  if (pictureParagraph) {
    pictureEl = pictureParagraph.querySelector('picture');
  }

  // Find the heading and any other text content
  const heading = contentWrapper.querySelector('h1, h2, h3, h4, h5, h6');
  // Optionally, find subheading or CTA (not present in this HTML, but for generality)
  // We'll collect all elements after the picture
  const textContent = [];
  // Get all children of contentWrapper
  const children = Array.from(contentWrapper.children);
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    // Skip the picture paragraph
    if (child === pictureParagraph) continue;
    // If it's empty <p>, skip
    if (child.tagName === 'P' && !child.textContent.trim() && !child.querySelector('a')) continue;
    textContent.push(child);
  }

  // Build the table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [pictureEl ? pictureEl : ''];
  const textRow = [textContent.length === 1 ? textContent[0] : textContent];

  const cells = [headerRow, imageRow, textRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
