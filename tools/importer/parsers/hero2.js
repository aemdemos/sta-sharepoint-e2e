/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner hero block
  const heroBlock = element.querySelector('.hero.block');
  let contentDiv = heroBlock;
  // Dive down as in the sample HTML: .hero.block > div > div
  if (contentDiv && contentDiv.children.length === 1 && contentDiv.firstElementChild.tagName === 'DIV') {
    contentDiv = contentDiv.firstElementChild;
    if (contentDiv.children.length === 1 && contentDiv.firstElementChild.tagName === 'DIV') {
      contentDiv = contentDiv.firstElementChild;
    }
  }

  // Table construction
  const cells = [];
  // 1st row: Block name as header
  cells.push(['Hero']);

  // 2nd row: Background image (picture in <p>, as in the HTML)
  let pictureElem = null;
  // Find the first <picture> in contentDiv
  const firstPicture = contentDiv.querySelector('picture');
  if (firstPicture) {
    // Reference its parent <p> if that's the immediate parent
    if (firstPicture.parentElement && firstPicture.parentElement.tagName === 'P') {
      pictureElem = firstPicture.parentElement;
    } else {
      pictureElem = firstPicture;
    }
    cells.push([pictureElem]);
  } else {
    cells.push(['']); // Empty if no image
  }

  // 3rd row: Heading and other content (h1, h2, p, etc) after the image
  // We'll collect ALL elements that are not the picture or its parent <p>
  const exclude = new Set();
  if (firstPicture) {
    // Exclude the <picture> and its parent <p>
    exclude.add(firstPicture);
    if (firstPicture.parentElement && firstPicture.parentElement.tagName === 'P') {
      exclude.add(firstPicture.parentElement);
    }
  }

  // Gather all direct children of contentDiv that are NOT in the exclude set and are not empty <p>
  const contentArr = [];
  for (const node of contentDiv.children) {
    if (exclude.has(node)) continue;
    // Don't add empty <p>
    if (node.tagName === 'P' && node.textContent.trim() === '' && !node.querySelector('img')) continue;
    contentArr.push(node);
  }

  // As fallback, gather all h1-h4, p, a, ul, ol, blockquote that are not in the exclude set
  if (contentArr.length === 0) {
    const descendants = Array.from(contentDiv.querySelectorAll('h1, h2, h3, h4, p, a, ul, ol, blockquote'));
    descendants.forEach(el => {
      if (exclude.has(el)) return;
      if (el.tagName === 'P' && el.textContent.trim() === '' && !el.querySelector('img')) return;
      contentArr.push(el);
    });
  }

  if (contentArr.length > 0) {
    cells.push([contentArr]);
  } else {
    cells.push(['']);
  }

  // Create and replace block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
