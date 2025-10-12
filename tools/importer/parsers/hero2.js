/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero2) block: 1 column, 3 rows
  // 1st row: block name
  // 2nd row: background image (optional)
  // 3rd row: heading, subheading, CTA (optional)

  // --- Model field: backgroundImage ---
  // Helper: find the first <img> in the block for the hero image
  let heroImg = element.querySelector('img');

  // --- Model field: heading ---
  // Helper: find the main heading (h1, h2, etc.)
  let heading = element.querySelector('h1, h2, h3');

  // --- Model field: subheading ---
  // Helper: find subheading (first <p> after heading, if any, and not empty)
  let subheading = null;
  if (heading) {
    let sib = heading.nextElementSibling;
    while (sib && sib.tagName.toLowerCase() !== 'p') {
      sib = sib.nextElementSibling;
    }
    if (sib && sib.textContent.trim()) {
      subheading = sib;
    }
  }

  // --- Model field: cta ---
  // Helper: find CTA (first <a> after heading, if any)
  let cta = null;
  if (heading) {
    let sib = heading.nextElementSibling;
    while (sib) {
      if (sib.querySelector && sib.querySelector('a')) {
        cta = sib.querySelector('a');
        break;
      }
      sib = sib.nextElementSibling;
    }
  }
  if (!cta) {
    // fallback: any <a> in the block
    cta = element.querySelector('a');
  }

  // Compose content for the 3rd row
  const content = [];
  if (heading) content.push(heading);
  if (subheading && subheading !== heading) content.push(subheading);
  if (cta) content.push(cta);

  // Build the table rows
  const rows = [
    ['Hero (hero2)'],
    [heroImg ? heroImg : ''],
    [content.length ? content : '']
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
