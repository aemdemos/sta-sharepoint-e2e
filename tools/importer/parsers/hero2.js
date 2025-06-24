/* global WebImporter */
export default function parse(element, { document }) {
  // Find the innermost div that contains the hero content
  let contentDiv = element;
  // Try to find the .hero.block
  const heroBlock = element.querySelector('.hero.block');
  if (heroBlock) {
    // Go down the divs to find the actual content
    let tmp = heroBlock;
    // Typically there are two nested divs inside, but let's be robust
    while (tmp && tmp.children.length === 1 && tmp.firstElementChild.tagName === 'DIV') {
      tmp = tmp.firstElementChild;
    }
    contentDiv = tmp;
  }

  // Find the image (picture) element in a <p>, and the heading (h1-h6)
  let imgRow = null;
  let headingRow = null;

  // Find picture in a <p>
  const pictureP = contentDiv.querySelector('p picture');
  if (pictureP && pictureP.parentElement) {
    imgRow = [pictureP.parentElement]; // reference the entire <p> with <picture> inside
  } else {
    // fallback: find direct <picture>
    const picture = contentDiv.querySelector('picture');
    if (picture) {
      imgRow = [picture];
    }
  }

  // Find the first heading (h1-h6)
  const heading = contentDiv.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) {
    headingRow = [heading];
  }

  // Prepare rows according to the Hero block structure: header, image row, heading row
  const rows = [];
  rows.push(['Hero']);
  rows.push(imgRow ? imgRow : ['']);
  rows.push(headingRow ? headingRow : ['']);

  // Remove trailing empty rows to match example where empty rows are omitted
  while (rows.length > 1 && (!rows[rows.length - 1][0] || rows[rows.length - 1][0].textContent.trim() === '')) {
    rows.pop();
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
