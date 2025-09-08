/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the first inner div for content
  const mainDiv = element.querySelector(':scope > div');
  let imageEl = null;
  let contentArr = [];

  if (mainDiv) {
    // Find the picture (preferred) or img inside the first p
    const firstP = mainDiv.querySelector('p');
    if (firstP) {
      imageEl = firstP.querySelector('picture') || firstP.querySelector('img');
    }
    // Collect all elements after the first p (should include headings, paragraphs, etc.)
    let foundFirstP = false;
    for (const child of mainDiv.children) {
      if (!foundFirstP && child.tagName.toLowerCase() === 'p') {
        foundFirstP = true;
        continue;
      }
      if (foundFirstP) {
        // Only add if not an empty paragraph or whitespace-only node
        if (
          child.tagName.match(/^H[1-6]$/) ||
          (child.tagName === 'P' && child.textContent.trim()) ||
          (child.tagName === 'A')
        ) {
          contentArr.push(child.cloneNode(true));
        }
      }
    }
    // If there is no content after the image, but there is a heading, include it
    if (contentArr.length === 0) {
      const heading = mainDiv.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) {
        contentArr.push(heading.cloneNode(true));
      }
    }
  }

  // Always output exactly 3 rows: header, image, content (even if content is empty string)
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imageEl ? imageEl : ''];
  // If there is no content, use an empty string (not an empty array)
  const contentRow = [contentArr.length ? contentArr : ''];

  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
