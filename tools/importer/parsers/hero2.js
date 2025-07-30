/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block wrapper
  let heroContent = element;
  if (element.classList.contains('hero-container')) {
    const wrapper = element.querySelector('.hero-wrapper .hero.block');
    if (wrapper) heroContent = wrapper;
  }

  // The real content is usually within two nested divs
  let contentDiv = heroContent;
  // Drill down one or two divs if present
  while (
    contentDiv &&
    contentDiv.childElementCount === 1 &&
    contentDiv.firstElementChild.tagName === 'DIV'
  ) {
    contentDiv = contentDiv.firstElementChild;
  }

  // Find the picture (background image), may be wrapped in <p>
  let imgEl = null;
  const picWrap = Array.from(contentDiv.children).find(
    ch => ch.querySelector && ch.querySelector('picture')
  );
  if (picWrap) {
    imgEl = picWrap.querySelector('picture');
  }

  // Collect all text content after the image (skip empty paragraphs)
  let foundPicture = false;
  const textEls = [];
  for (const child of contentDiv.children) {
    if (!foundPicture && child.querySelector && child.querySelector('picture')) {
      foundPicture = true;
      continue;
    }
    if (child.tagName === 'P' && !child.textContent.trim()) continue;
    if (/^H[1-6]$/.test(child.tagName) || (child.tagName === 'P' && child.textContent.trim())) {
      textEls.push(child);
    }
  }

  // Table: 1 column, 3 rows
  const rows = [
    ['Hero'],
    [imgEl ? imgEl : ''],
    [textEls.length > 0 ? textEls : '']
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
