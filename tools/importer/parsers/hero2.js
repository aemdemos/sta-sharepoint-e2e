/* global WebImporter */
export default function parse(element, { document }) {
  // Find the innermost div that contains the hero content
  const heroBlock = element.querySelector('.hero-wrapper .hero.block');
  if (!heroBlock) return;

  // The hero block's content is inside the first <div> descendant
  let contentDiv = heroBlock.querySelector('div');
  if (contentDiv && contentDiv.querySelector('div')) {
    // Sometimes there's an extra wrapping div
    contentDiv = contentDiv.querySelector('div');
  }
  if (!contentDiv) return;

  // Get background image (first picture or img)
  let imageEl = null;
  let firstPic = contentDiv.querySelector('picture');
  if (firstPic) {
    imageEl = firstPic;
  } else {
    let firstImg = contentDiv.querySelector('img');
    if (firstImg) imageEl = firstImg;
  }

  // Get heading, subheading, CTA (everything except the image)
  // We'll collect all elements except the <picture> and empty <p>
  const contentNodes = [];
  for (const child of contentDiv.children) {
    if (child.matches('picture')) continue;
    // Ignore empty paragraphs
    if (child.matches('p') && child.textContent.trim() === '') continue;
    contentNodes.push(child);
  }

  // Build table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imageEl ? imageEl : ''];
  const textRow = [contentNodes.length === 1 ? contentNodes[0] : contentNodes];

  const cells = [headerRow, imageRow, textRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
