/* global WebImporter */
export default function parse(element, { document }) {
  // Extract top-level hero block data
  // Find main image (picture or img)
  let pictureEl = null;
  let headingEl = null;

  // Search for first <picture> inside the block
  pictureEl = element.querySelector('picture');
  // Search for first <img> if no <picture> found
  if (!pictureEl) {
    const imgEl = element.querySelector('img');
    if (imgEl) pictureEl = imgEl;
  }

  // Find the first heading (usually h1)
  headingEl = element.querySelector('h1, h2, h3, h4, h5, h6');

  // Compose the table rows
  const headerRow = ['Hero'];
  const imageRow = [pictureEl ? pictureEl : ''];
  // Compose content: heading and any other block text
  const contentArr = [];
  if (headingEl) contentArr.push(headingEl);

  // Collect additional text (paragraphs, subheadings, ctas) after the heading
  // Only include elements that are visible/sensible (not empty <p>)
  let contentParent = headingEl ? headingEl.parentElement : element;
  let foundHeading = false;
  if (contentParent) {
    Array.from(contentParent.children).forEach((child) => {
      if (child === headingEl) {
        foundHeading = true;
        return;
      }
      if (foundHeading) {
        if (child.tagName === 'P' && child.textContent.trim()) {
          contentArr.push(child);
        } else if (/^H[2-6]$/.test(child.tagName)) {
          contentArr.push(child);
        }
        // Add more logic for CTAs if needed (a, button)
      }
    });
  }

  const contentRow = [contentArr.length > 0 ? contentArr : ''];

  // Create table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace original element
  element.replaceWith(table);
}
