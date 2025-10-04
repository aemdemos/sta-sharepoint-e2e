/* global WebImporter */
export default function parse(element, { document }) {
  // Find the innermost content div
  let contentDiv = element;
  while (contentDiv && contentDiv.querySelector(':scope > div')) {
    contentDiv = contentDiv.querySelector(':scope > div');
  }

  // Extract image (background image)
  let imageEl = null;
  const picture = contentDiv.querySelector('picture');
  if (picture) {
    imageEl = picture.querySelector('img');
  }

  // Extract heading (title)
  const heading = contentDiv.querySelector('h1');

  // Collect text content for the third row (title, subheading, CTA)
  // Only h1 is present in this example, but future-proof for more content
  const textContent = [];
  if (heading) textContent.push(heading);
  // Add any non-empty paragraphs after the heading
  let foundHeading = false;
  contentDiv.childNodes.forEach((node) => {
    if (node === heading) {
      foundHeading = true;
    } else if (foundHeading && node.nodeType === 1 && node.tagName === 'P' && node.textContent.trim()) {
      textContent.push(node);
    }
  });

  // Build the table
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imageEl ? imageEl : ''];
  const textRow = [textContent.length ? textContent : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    textRow,
  ], document);

  element.replaceWith(table);
}
