/* global WebImporter */
export default function parse(element, { document }) {
  // Table must have 'Hero' as header, image as 2nd row, then all text as 3rd row
  // Find the relevant block/div
  // The .hero.block is inside .hero-wrapper, which is inside .hero-container
  let heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) heroBlock = element.querySelector('.hero-wrapper');
  if (!heroBlock) heroBlock = element;

  // The content is inside heroBlock > div > div (sometimes just heroBlock > div)
  let contentDiv;
  const firstDiv = heroBlock.querySelector(':scope > div');
  if (firstDiv) {
    contentDiv = firstDiv.querySelector(':scope > div') || firstDiv;
  } else {
    contentDiv = heroBlock;
  }

  // 1. Get the image (picture or img)
  let imageEl = contentDiv.querySelector('picture, img');
  // 2. Get all headings and paragraphs after the image
  // We'll get all element children after the first <picture> or <img>
  const children = Array.from(contentDiv.children);
  let imgIdx = children.findIndex(el => el.querySelector('picture, img') || el.tagName.toLowerCase() === 'picture' || el.tagName.toLowerCase() === 'img');
  if (imgIdx === -1) imgIdx = 0;
  // Gather all elements after image for text cell (take all headings, paragraphs, etc. except empty <p>)
  const textEls = [];
  for (let i = imgIdx + 1; i < children.length; i += 1) {
    const el = children[i];
    // Skip empty <p>
    if (el.tagName.toLowerCase() === 'p' && el.textContent.trim() === '' && el.children.length === 0) continue;
    textEls.push(el);
  }

  // If children are nested (like <div><p>...</p><h1>...</h1></div>), flatten them
  if (textEls.length === 0 && contentDiv.querySelectorAll('h1, h2, h3, h4, h5, h6, p').length > 0) {
    contentDiv.querySelectorAll('h1, h2, h3, h4, h5, h6, p').forEach(el => {
      // Do not include the <picture> or <img> again
      if (el.closest('picture') || el.closest('img')) return;
      if (el.tagName.toLowerCase() === 'p' && el.textContent.trim() === '' && el.children.length === 0) return;
      textEls.push(el);
    });
  }

  // Table rows
  const rows = [];
  rows.push(['Hero']);
  rows.push([imageEl || '']);
  rows.push([textEls.length ? textEls : '']);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
