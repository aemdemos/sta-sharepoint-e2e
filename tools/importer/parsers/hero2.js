/* global WebImporter */
export default function parse(element, { document }) {
  // Find the block root (the .hero.block) within the container
  let blockRoot = element.querySelector('.hero.block');
  if (!blockRoot) blockRoot = element;

  // The hero content is usually: .hero.block > div > div > ...
  // We'll use the first picture/img for the image, and the heading/paragraphs for content
  let mainDiv = blockRoot.querySelector(':scope > div');
  let innerDiv = mainDiv ? mainDiv.querySelector(':scope > div') : null;
  let children = innerDiv ? Array.from(innerDiv.children) : [];

  // Find image: first <picture> or <img>
  let imageEl = null;
  for (let child of children) {
    let pic = child.querySelector('picture');
    let img = child.querySelector('img');
    if (pic) {
      imageEl = pic;
      break;
    } else if (img) {
      imageEl = img;
      break;
    }
  }
  // Fallback: search main block
  if (!imageEl) {
    imageEl = blockRoot.querySelector('picture') || blockRoot.querySelector('img');
  }

  // Find content: any heading(s) or meaningful <p> (non-empty)
  let contentEls = [];
  for (let child of children) {
    if (/^H[1-6]$/.test(child.tagName) || (child.tagName === 'P' && child.textContent.trim().length > 0)) {
      contentEls.push(child);
    }
  }
  // Fallback if above failed
  if (contentEls.length === 0) {
    contentEls = Array.from(blockRoot.querySelectorAll('h1, h2, h3, h4, h5, h6, p')).filter(el => el.textContent.trim().length > 0);
  }

  // Compose the table rows as in the example
  const tableRows = [
    ['Hero'],
    [imageEl ? imageEl : ''],
    [contentEls.length > 0 ? contentEls : '']
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}
