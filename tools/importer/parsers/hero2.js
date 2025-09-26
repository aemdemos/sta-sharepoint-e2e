/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the deepest block content container
  // The structure is: section > hero-wrapper > hero block > [content]
  let contentRoot = element;
  // Find .hero-wrapper
  const heroWrapper = element.querySelector('.hero-wrapper');
  if (heroWrapper) contentRoot = heroWrapper;
  // Find .hero.block
  const heroBlock = contentRoot.querySelector('.hero.block');
  if (heroBlock) contentRoot = heroBlock;
  // Find the innermost content div
  let innerDiv = contentRoot.querySelector('div > div');
  if (innerDiv) contentRoot = innerDiv;

  // Now, contentRoot should contain the image and headings
  // Find the image (inside <picture> in a <p>)
  let imageEl = null;
  const pictureP = contentRoot.querySelector('p picture');
  if (pictureP) {
    // Use the <img> inside <picture>
    imageEl = pictureP.querySelector('img');
  }

  // Find the heading (h1, h2, etc.)
  let headingEl = null;
  headingEl = contentRoot.querySelector('h1, h2, h3, h4, h5, h6');

  // Find subheading and CTA (not present in this example, but code is ready)
  // Subheading: next heading after main heading
  let subheadingEl = null;
  if (headingEl) {
    let next = headingEl.nextElementSibling;
    while (next) {
      if (/^h[2-6]$/i.test(next.tagName)) {
        subheadingEl = next;
        break;
      }
      next = next.nextElementSibling;
    }
  }
  // CTA: look for <a> inside a <p>
  let ctaEl = null;
  const ctaP = contentRoot.querySelector('p a');
  if (ctaP) ctaEl = ctaP;

  // Compose the rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imageEl ? imageEl : ''];
  // Compose text cell: heading, subheading, CTA
  const textCellContent = [];
  if (headingEl) textCellContent.push(headingEl);
  if (subheadingEl) textCellContent.push(subheadingEl);
  if (ctaEl) textCellContent.push(ctaEl);
  // If no heading/subheading/CTA, leave blank
  const textRow = [textCellContent.length ? textCellContent : ''];

  // Build the table
  const tableCells = [headerRow, imageRow, textRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
