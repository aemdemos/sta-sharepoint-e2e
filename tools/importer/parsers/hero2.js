/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the hero image and heading
  // The image is inside a <picture> within a <p>
  let imageEl = null;
  let headingEl = null;

  // Find all immediate children of the block
  // The structure is: <div><div><p><picture>...</picture></p><h1>...</h1><p></p></div></div>
  // So we want the first <picture> and first <h1>
  const innerDiv = element.querySelector(':scope > div > div');
  if (innerDiv) {
    // Find <picture> inside a <p>
    const pWithPicture = innerDiv.querySelector('p picture');
    if (pWithPicture) {
      // Use the parent <p> for better context
      imageEl = pWithPicture.parentElement;
    }
    // Find the first <h1>
    headingEl = innerDiv.querySelector('h1');
  }

  // Build table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [headingEl ? headingEl : ''];

  // Create the table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
