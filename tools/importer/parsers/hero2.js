/* global WebImporter */
export default function parse(element, { document }) {
  // Get the hero block's content
  const heroBlock = element.querySelector('.hero.block');
  let imageCell = null;
  const textCell = [];

  if (heroBlock) {
    // The innermost div containing content
    const innerDiv = heroBlock.querySelector(':scope > div > div');
    if (innerDiv) {
      // Find the <picture> (background image) inside a <p>
      const pictureP = innerDiv.querySelector('p picture');
      if (pictureP) {
        // Use the parent <p> wrapping the <picture>
        imageCell = pictureP.parentElement;
      } else {
        // Fallback: find direct <img>
        const img = innerDiv.querySelector('img');
        if (img) {
          imageCell = img;
        }
      }

      // Find heading(s), paragraphs, and any other content except the image
      // Exclude the paragraph that contains the picture
      Array.from(innerDiv.children).forEach(child => {
        // If it's the <p> containing <picture>, skip
        if (
          child.tagName === 'P' &&
          child.querySelector('picture')
        ) {
          return;
        }
        // Add any heading or paragraph
        if (
          child.tagName.match(/^H[1-6]$/) ||
          (child.tagName === 'P')
        ) {
          // Only add non-empty paragraphs
          if (child.textContent.trim() || child.tagName.match(/^H[1-6]$/)) {
            textCell.push(child);
          }
        }
      });
    }
  }

  // Build the table
  const rows = [
    ['Hero'],         // Header row
    [imageCell],      // Image row
    [textCell]        // Text row (array of elements)
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}