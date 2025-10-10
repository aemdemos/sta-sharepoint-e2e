/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero2) block: 1 column, 3 rows
  // Row 1: Block name
  // Row 2: Background image (optional)
  // Row 3: Title (h1), subheading (optional), CTA (optional)

  // Defensive: find the hero image (img inside picture)
  let heroImg = null;
  const picture = element.querySelector('picture');
  if (picture) {
    heroImg = picture.querySelector('img');
  }

  // Defensive: find the main heading (h1)
  let heading = element.querySelector('h1');

  // Defensive: find subheading (not present in this example)
  // and CTA (not present in this example)
  // We'll only add what exists

  // Build the table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [heroImg ? heroImg : ''];
  // Compose the content row
  const contentRow = [];
  if (heading) contentRow.push(heading);
  // (No subheading or CTA in this example)

  const tableRows = [
    headerRow,
    imageRow,
    [contentRow], // contentRow is an array of elements, put in a single cell
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
