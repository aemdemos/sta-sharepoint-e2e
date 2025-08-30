/* global WebImporter */
export default function parse(element, { document }) {
  // The block expects: 1-column, 3-rows: header, image, content
  // 1. Find the image row
  // 2. Collect the content row (headings, paragraphs)

  // Find the hero block inner div (hero block > div > div)
  let innerContent = element.querySelector('.hero.block > div > div') || element.querySelector('.hero.block > div') || element;

  // Find the <p> containing <picture> or <img>
  let imageCell = '';
  const pWithPicture = innerContent.querySelector('p picture')?.parentElement;
  if (pWithPicture) {
    imageCell = pWithPicture;
  } else {
    // fallback: look for direct picture or img
    const picture = innerContent.querySelector('picture');
    if (picture) imageCell = picture;
    else {
      const img = innerContent.querySelector('img');
      if (img) imageCell = img;
    }
  }

  // Gather all content for the content cell (except the image)
  const contentCell = [];
  Array.from(innerContent.children).forEach(child => {
    if (child === imageCell) return;
    // Ignore empty paragraphs
    if (child.tagName.toLowerCase() === 'p' && !child.textContent.trim()) return;
    contentCell.push(child);
  });

  // Build the table rows
  const rows = [
    ['Hero (hero2)'],
    [imageCell],
    [contentCell]
  ];
  
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
