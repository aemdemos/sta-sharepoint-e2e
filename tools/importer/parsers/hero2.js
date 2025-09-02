/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .hero.block
  let heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) heroBlock = element;

  // The content of the hero block is usually nested: heroBlock > div > div
  let contentContainer = heroBlock;
  // Try to go deeper if the structure is as in the HTML
  if (heroBlock.children.length === 1 && heroBlock.firstElementChild.children.length === 1) {
    contentContainer = heroBlock.firstElementChild.firstElementChild;
  } else if (heroBlock.children.length === 1) {
    contentContainer = heroBlock.firstElementChild;
  }

  // Grab picture (background image) and heading/texts
  let picturePara = contentContainer.querySelector('p:has(picture)');
  let pictureEl = null;
  if (picturePara) {
    pictureEl = picturePara;
  } else {
    let pic = contentContainer.querySelector('picture');
    if (pic) pictureEl = pic;
  }

  // Gather text content: h1, h2, h3, h4, h5, h6, p (excluding ones that have picture)
  let contentEls = [];
  for (const child of contentContainer.children) {
    // Exclude the picture-containing paragraph
    if (child === pictureEl) continue;
    // Exclude empty <p> or empty elements
    if (child.tagName === 'P' && child.textContent.trim() === '') continue;
    // Add only if not a picture (already handled)
    contentEls.push(child);
  }

  // Remove trailing empty paragraphs if any
  while (contentEls.length && contentEls[contentEls.length - 1].tagName === 'P' && contentEls[contentEls.length - 1].textContent.trim() === '') {
    contentEls.pop();
  }

  // Build the table as per requirements
  const cells = [
    ['Hero (hero2)'],
    [pictureEl ? pictureEl : ''],
    [contentEls.length === 1 ? contentEls[0] : contentEls]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
