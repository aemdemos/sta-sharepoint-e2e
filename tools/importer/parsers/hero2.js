/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero image and heading
  let imgEl = null;
  let headingEl = null;

  // Find all immediate div children
  const divs = element.querySelectorAll(':scope > div');
  divs.forEach((div) => {
    const picture = div.querySelector('picture');
    if (picture) {
      imgEl = picture;
    }
    const h1 = div.querySelector('h1');
    if (h1) {
      headingEl = h1;
    }
  });

  if (!imgEl) {
    imgEl = element.querySelector('picture');
  }
  if (!headingEl) {
    headingEl = element.querySelector('h1, h2, h3');
  }

  // Compose text content cell (title, subheading, CTA)
  const textContent = [];
  if (headingEl) textContent.push(headingEl);
  // If there are other paragraphs or CTAs, add them here
  // (In this HTML, there are no subheading or CTA)

  // Build table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imgEl ? imgEl : ''];
  const textRow = [textContent.length ? textContent : ''];

  // Ensure 3 rows: header, image, text
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
