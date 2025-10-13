/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row (must match block name exactly)
  const headerRow = ['Hero (hero2)'];

  // 2. Extract the background image (must reference the existing <img> element)
  const img = element.querySelector('img');
  let imageCell = '';
  if (img) {
    imageCell = img;
  }

  // 3. Extract content: heading, subheading, CTA, and any additional text
  const contentCell = [];
  // Main heading (h1)
  const h1 = element.querySelector('h1');
  if (h1) contentCell.push(h1);
  // Subheading (h2/h3/h4)
  const subheading = element.querySelector('h2, h3, h4');
  if (subheading) contentCell.push(subheading);
  // Additional paragraphs (not containing the image)
  const paragraphs = Array.from(element.querySelectorAll('p')).filter(p => !p.querySelector('img') && p.textContent.trim());
  paragraphs.forEach(p => contentCell.push(p));
  // CTA (first anchor)
  const cta = element.querySelector('a');
  if (cta) contentCell.push(cta);

  // 4. Compose rows for the table
  const rows = [
    headerRow,
    [imageCell],
    [contentCell.length ? contentCell : '']
  ];

  // 5. Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
