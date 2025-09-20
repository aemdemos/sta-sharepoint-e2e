/* global WebImporter */
export default function parse(element, { document }) {
  // Find the deepest content container
  let contentDiv = element;
  for (let i = 0; i < 4; i++) {
    const firstDiv = contentDiv.querySelector(':scope > div');
    if (firstDiv) {
      contentDiv = firstDiv;
    } else {
      break;
    }
  }

  // Extract image (background)
  let imageEl = null;
  const firstPicture = contentDiv.querySelector('picture');
  if (firstPicture) {
    imageEl = firstPicture;
  }

  // Extract all possible content for the third row: heading, subheading, CTA
  // We'll collect all elements after the image <picture>, or all if no image
  const contentRowItems = [];
  let afterImage = !imageEl; // If no image, start from beginning
  Array.from(contentDiv.children).forEach((child) => {
    if (!afterImage && child.querySelector && child.querySelector('picture')) {
      afterImage = true;
      return;
    }
    if (afterImage && (child.tagName.match(/^H[1-6]$/) || child.tagName === 'P' || child.tagName === 'A')) {
      if (child.textContent.trim() !== '') {
        contentRowItems.push(child);
      }
    }
  });

  // Ensure the table always has 3 rows (header, image, content)
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [contentRowItems.length ? contentRowItems : ''];

  // Guarantee 3 rows even if some are empty
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  // If for any reason there are fewer than 3 rows, pad with empty rows
  while (cells.length < 3) {
    cells.push(['']);
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
