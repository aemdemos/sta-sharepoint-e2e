/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .hero.block element
  const heroBlock = element.querySelector('.hero.block');
  let pictureEl = null;
  let headingEl = null;

  if (heroBlock) {
    // The hero block's inner content: look for the first inner div
    const mainContentDiv = heroBlock.querySelector(':scope > div > div');
    if (mainContentDiv) {
      // Find first <picture>
      const pWithPicture = Array.from(mainContentDiv.children).find(
        (child) => child.tagName === 'P' && child.querySelector('picture')
      );
      if (pWithPicture) {
        pictureEl = pWithPicture.querySelector('picture');
      }
      // Find the first <h1>-<h6> element after the picture
      // Ensure it's not missed if wrapped or not directly after
      const headingCandidate = Array.from(mainContentDiv.children).find(
        (child) => /^H[1-6]$/.test(child.tagName)
      );
      if (headingCandidate) {
        headingEl = headingCandidate;
      }
    }
  }

  // Build table: header, image row, heading row
  const rows = [
    ['Hero'],
    [pictureEl ? pictureEl : ''],
    [headingEl ? headingEl : '']
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
