/* global WebImporter */
export default function parse(element, { document }) {
  // Traverse to the innermost div containing the hero content
  let contentDiv = element;
  if (contentDiv.querySelector(':scope > .hero-wrapper')) {
    contentDiv = contentDiv.querySelector(':scope > .hero-wrapper');
  }
  if (contentDiv.querySelector(':scope > .hero.block')) {
    contentDiv = contentDiv.querySelector(':scope > .hero.block');
  }
  let innerDiv = contentDiv;
  if (innerDiv.querySelector(':scope > div')) {
    innerDiv = innerDiv.querySelector(':scope > div');
  }
  if (innerDiv.querySelector(':scope > div')) {
    innerDiv = innerDiv.querySelector(':scope > div');
  }

  // Extract picture (background image)
  const picture = innerDiv.querySelector('picture');

  // Compose the third row: Title, Subheading, CTA all in one cell
  const thirdRowContent = [];
  // Title (h1)
  const heading = innerDiv.querySelector('h1');
  if (heading) thirdRowContent.push(heading);
  // Subheading (h2/h3 after h1)
  let subheading = null;
  if (heading) {
    let sib = heading.nextElementSibling;
    while (sib) {
      if (/^H[23]$/i.test(sib.tagName)) {
        subheading = sib;
        break;
      }
      sib = sib.nextElementSibling;
    }
  }
  if (subheading) thirdRowContent.push(subheading);
  // CTA (first link)
  const cta = innerDiv.querySelector('a');
  if (cta) thirdRowContent.push(cta);

  // Always provide a third row, even if empty
  const headerRow = ['Hero (hero2)'];
  const imageRow = [picture ? picture : ''];
  const thirdRow = [thirdRowContent.length ? thirdRowContent : ''];

  // Compose the table
  const cells = [headerRow, imageRow, thirdRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
