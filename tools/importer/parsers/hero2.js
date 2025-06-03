/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block content
  let contentDiv = null;
  const heroWrapper = element.querySelector('.hero-wrapper');
  if (heroWrapper) {
    const heroBlock = heroWrapper.querySelector('.hero.block');
    if (heroBlock) {
      // Try to find the innermost content div
      let inner = heroBlock.querySelector(':scope > div > div');
      if (!inner) {
        // fallback if not deeply nested
        inner = heroBlock.querySelector(':scope > div');
      }
      if (inner) {
        contentDiv = inner;
      }
    }
  }
  if (!contentDiv) {
    // fallback to main element if structure is different
    contentDiv = element;
  }

  // Content for the row: background image (picture), heading, (optional subheading, CTA)
  // We'll collect all picture, headings in order found
  const cells = [];
  cells.push(['Hero (hero2)']); // header row
  const content = [];
  // gather all <picture> (image), keep parent <p> if that's the only child in it
  const pictures = contentDiv.querySelectorAll('picture');
  pictures.forEach(picture => {
    const parentP = picture.parentElement;
    if (
      parentP &&
      parentP.tagName === 'P' &&
      parentP.childElementCount === 1
    ) {
      content.push(parentP);
    } else {
      content.push(picture);
    }
  });
  // gather all heading tags (h1-h6)
  const headings = contentDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach(h => content.push(h));
  // If there is a subheading (not in this example), could check for a <p> following headings
  // If there is a CTA (not in this example), could check for <a> as button or link
  // Add the content row
  cells.push([content]);

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
