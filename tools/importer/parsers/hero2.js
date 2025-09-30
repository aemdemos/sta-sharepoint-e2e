/* global WebImporter */
export default function parse(element, { document }) {
  // Drill down to the innermost div that contains the hero content
  let heroContentDiv = element;
  while (
    heroContentDiv &&
    heroContentDiv.children &&
    heroContentDiv.children.length === 1 &&
    heroContentDiv.firstElementChild.tagName === 'DIV'
  ) {
    heroContentDiv = heroContentDiv.firstElementChild;
  }

  // Find the image (background image)
  let bgImage = null;
  const picture = heroContentDiv.querySelector('picture');
  if (picture) {
    // Use the <picture> element directly (do not wrap in <p>)
    bgImage = picture;
  }

  // Compose the text cell: title, subheading, CTA (all in one cell)
  const textCellContent = [];

  // Title (first heading)
  const heading = heroContentDiv.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) textCellContent.push(heading);

  // Subheading: next heading after the first heading
  let subheading = null;
  if (heading) {
    let next = heading.nextElementSibling;
    while (next) {
      if (/H[1-6]/.test(next.tagName)) {
        subheading = next;
        break;
      }
      next = next.nextElementSibling;
    }
  }
  if (subheading) textCellContent.push(subheading);

  // Add all non-empty paragraphs between heading and subheading (or after heading if no subheading)
  if (heading) {
    let next = heading.nextElementSibling;
    while (next && next !== subheading) {
      if (next.tagName === 'P' && next.textContent.trim()) {
        textCellContent.push(next);
      }
      next = next.nextElementSibling;
    }
  }

  // CTA: first <a> after heading or subheading
  let cta = null;
  if (subheading) {
    let next = subheading.nextElementSibling;
    while (next) {
      if (next.querySelector && next.querySelector('a')) {
        cta = next.querySelector('a');
        break;
      }
      next = next.nextElementSibling;
    }
  } else if (heading) {
    let next = heading.nextElementSibling;
    while (next) {
      if (next.querySelector && next.querySelector('a')) {
        cta = next.querySelector('a');
        break;
      }
      next = next.nextElementSibling;
    }
  }
  if (!cta) cta = heroContentDiv.querySelector('a');
  if (cta && !textCellContent.includes(cta)) textCellContent.push(cta);

  // Always create 3 rows: header, image, text (even if image or text is missing)
  const headerRow = ['Hero (hero2)'];
  const imageRow = [bgImage ? bgImage : ''];
  const textRow = [textCellContent.length ? textCellContent : ''];

  const cells = [headerRow, imageRow, textRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
