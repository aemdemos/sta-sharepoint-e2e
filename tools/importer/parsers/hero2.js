/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero2) block: 1 column, 3 rows
  // Row 1: block name
  // Row 2: background image (optional)
  // Row 3: headline, subheading, CTA (optional)

  // 1. Extract the background image (first <img> in <picture>)
  let imgEl = null;
  const picture = element.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      // Reference the existing image element
      imgEl = img;
    }
  }

  // 2. Extract the headline (first h1)
  let headline = element.querySelector('h1');

  // 3. Extract subheading (h2/h3 or first non-empty <p> after h1)
  let subheading = null;
  if (headline) {
    let next = headline.nextElementSibling;
    while (next) {
      if ((next.tagName === 'H2' || next.tagName === 'H3' || next.tagName === 'P') && next.textContent.trim()) {
        subheading = next;
        break;
      }
      next = next.nextElementSibling;
    }
  }

  // 4. Extract CTA (first <a href>)
  let cta = null;
  const link = element.querySelector('a[href]');
  if (link) {
    cta = link;
  }

  // 5. Compose the content cell for row 3
  const row3Content = [];
  if (headline) row3Content.push(headline);
  if (subheading) row3Content.push(subheading);
  if (cta) row3Content.push(cta);

  // 6. Build the table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imgEl ? imgEl : ''];
  const contentRow = [row3Content.length ? row3Content : ''];

  // 7. Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  // 8. Replace the original element with the new table
  element.replaceWith(table);
}
