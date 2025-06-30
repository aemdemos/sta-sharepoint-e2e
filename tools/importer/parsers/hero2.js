/* global WebImporter */
export default function parse(element, { document }) {
  // Find .hero.block within the section (robust against wrapping)
  const heroBlock = element.querySelector('.hero.block');
  let mainContent = heroBlock;
  // The immediate child div contains the image and text
  if (mainContent && mainContent.children.length === 1 && mainContent.firstElementChild.tagName === 'DIV') {
    mainContent = mainContent.firstElementChild;
  }
  // Sometimes another div (as in the sample)
  if (mainContent && mainContent.children.length === 1 && mainContent.firstElementChild.tagName === 'DIV') {
    mainContent = mainContent.firstElementChild;
  }

  // At this point, mainContent houses all block content: p>picture, h1, etc.
  let imageRow = null;
  let textRow = [];
  if (mainContent) {
    // Find first p>picture for the background image
    const picturePara = Array.from(mainContent.children).find(child => child.tagName === 'P' && child.querySelector('picture'));
    if (picturePara) {
      imageRow = [picturePara];
    }
    // Collect all content after the image paragraph for the text row
    let foundPicture = false;
    for (const child of mainContent.children) {
      if (child === picturePara) {
        foundPicture = true;
        continue;
      }
      if (imageRow && !foundPicture) continue; // Skip until picture found
      if (child.textContent.trim() !== '') {
        textRow.push(child);
      }
    }
    // If no image, textRow gets all children
    if (!imageRow) {
      textRow = Array.from(mainContent.children).filter(child => child.textContent.trim() !== '');
    }
  }
  // Compose table rows
  const rows = [];
  rows.push(['Hero']);
  if (imageRow) rows.push(imageRow);
  if (textRow.length > 0) rows.push([textRow.length === 1 ? textRow[0] : textRow]);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
