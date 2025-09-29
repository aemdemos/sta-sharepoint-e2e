/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the deepest content container
  // The structure is: section > hero-wrapper > hero.block > div > div > [content]
  let contentDiv = element;
  // Traverse down to the content div
  for (let i = 0; i < 4; i++) {
    if (contentDiv && contentDiv.children && contentDiv.children.length === 1) {
      contentDiv = contentDiv.children[0];
    }
  }

  // Now contentDiv should contain the actual hero content: [p>picture], h1, p (empty)
  // Find the image (picture/img)
  let imageEl = null;
  let headingEl = null;
  let subheadingEl = null;
  let ctaEl = null;

  // Find picture/img
  const pictureP = Array.from(contentDiv.children).find(
    (child) => child.tagName === 'P' && child.querySelector('picture')
  );
  if (pictureP) {
    imageEl = pictureP.querySelector('picture') || pictureP.querySelector('img');
  }

  // Find heading (h1)
  headingEl = contentDiv.querySelector('h1');

  // Find subheading (h2/h3) and CTA (a)
  // For this source, there is only h1 and no CTA or subheading, but code defensively
  subheadingEl = contentDiv.querySelector('h2, h3');
  ctaEl = contentDiv.querySelector('a');

  // Compose the rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imageEl ? imageEl : ''];
  const textRowContent = [];
  if (headingEl) textRowContent.push(headingEl);
  if (subheadingEl) textRowContent.push(subheadingEl);
  // Could also include paragraph text if present
  // Find first non-empty paragraph after heading
  const paragraphs = Array.from(contentDiv.querySelectorAll('p'));
  const nonEmptyParagraphs = paragraphs.filter(p => p.textContent.trim());
  nonEmptyParagraphs.forEach(p => {
    // Avoid including the picture paragraph
    if (!p.querySelector('picture')) {
      textRowContent.push(p);
    }
  });
  if (ctaEl) textRowContent.push(ctaEl);
  const textRow = [textRowContent.length ? textRowContent : ''];

  // Build the table
  const cells = [headerRow, imageRow, textRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
