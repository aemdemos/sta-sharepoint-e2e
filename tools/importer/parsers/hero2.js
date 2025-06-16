/* global WebImporter */
export default function parse(element, { document }) {
  // Drill down to the actual block content
  let contentDiv = element;
  if (contentDiv.querySelector('.hero-wrapper')) contentDiv = contentDiv.querySelector('.hero-wrapper');
  if (contentDiv.querySelector('.hero')) contentDiv = contentDiv.querySelector('.hero');
  let innerDiv = contentDiv.querySelector('div > div') || contentDiv.querySelector('div') || contentDiv;

  // Row 2: Find the image <picture> or its wrapping <p>
  let imgRow = '';
  const picture = innerDiv.querySelector('picture');
  if (picture) {
    const parentP = picture.closest('p');
    if (parentP && parentP.childElementCount === 1 && parentP.querySelector('picture')) {
      imgRow = parentP;
    } else {
      imgRow = picture;
    }
  }

  // Row 3: Find the first heading (h1-h6) as element
  let heading = '';
  // Use only a direct child heading for best resilience
  const directChildren = Array.from(innerDiv.children);
  heading = directChildren.find(el => /^H[1-6]$/.test(el.tagName) && el.textContent.trim().length > 0);
  // Fallback: querySelector if no direct child heading found
  if (!heading) {
    heading = innerDiv.querySelector('h1, h2, h3, h4, h5, h6');
  }

  const rows = [
    ['Hero'],
    [imgRow || ''],
    [heading || ''],
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
