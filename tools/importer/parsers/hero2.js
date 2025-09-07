/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the hero image and heading
  let imgEl = null;
  let headingEl = null;

  // Find the image (inside <picture> in a <p>)
  // The structure is: <div><div><p><picture><img>...</picture></p><h1>...</h1></div></div>
  // We'll look for the first <img> descendant
  imgEl = element.querySelector('img');

  // Find the heading (h1)
  headingEl = element.querySelector('h1');

  // Build the table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imgEl ? imgEl : ''];
  // Compose the text row: heading (h1)
  const textRowContent = [];
  if (headingEl) textRowContent.push(headingEl);
  const textRow = [textRowContent.length ? textRowContent : ''];

  // Compose the table
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
