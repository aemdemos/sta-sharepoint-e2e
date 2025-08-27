/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the hero block content: may be nested inside wrappers
  let mainContent = element;

  // Traverse down if we are given the section/container
  const wrapper = element.querySelector('.hero-wrapper');
  if (wrapper) mainContent = wrapper;
  const heroBlock = mainContent.querySelector('.hero.block');
  if (heroBlock) mainContent = heroBlock;
  // Deepest div inside hero block (skip nested divs)
  while (
    mainContent &&
    mainContent.children.length === 1 &&
    mainContent.firstElementChild.tagName === 'DIV'
  ) {
    mainContent = mainContent.firstElementChild;
  }

  // 2. Extract image row: <picture> or <img> inside a <p>
  let imgCell = '';
  const picture = mainContent.querySelector('picture');
  if (picture) {
    // Reference the <p> containing the <picture> (if exists)
    let imgParent = picture.parentElement;
    if (imgParent.tagName === 'P') {
      imgCell = imgParent;
    } else {
      // Should rarely happen; wrap in <p> for layout
      const p = document.createElement('p');
      p.appendChild(picture);
      imgCell = p;
    }
  }

  // 3. Extract the text row: headings, paragraphs, cta, etc., except the image
  const textElements = [];
  for (const child of mainContent.children) {
    // Ignore the image row (the <p> containing <picture> or the <picture> itself)
    if (picture && (child === picture || child.contains(picture))) continue;
    // Ignore empty paragraphs
    if (child.tagName === 'P' && child.textContent.trim() === '') continue;
    textElements.push(child);
  }

  // If no text, textElements stays empty, which is allowed.

  // 4. Construct table as per block definition
  const cells = [
    ['Hero'], // header row exactly as example
    [imgCell], // image row
    [textElements.length ? textElements : ''] // text row, empty string if nothing
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
