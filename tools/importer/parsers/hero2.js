/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Get to the actual content div
  let heroContentDiv = element;
  // Step into .hero-wrapper if present
  const wrapper = heroContentDiv.querySelector(':scope > .hero-wrapper');
  if (wrapper) heroContentDiv = wrapper;
  // Step into .hero.block if present
  const block = heroContentDiv.querySelector(':scope > .hero.block');
  if (block) heroContentDiv = block;
  // Step into nested divs if present
  let childDiv = heroContentDiv.querySelector(':scope > div');
  if (childDiv) {
    const grandChildDiv = childDiv.querySelector(':scope > div');
    if (grandChildDiv) heroContentDiv = grandChildDiv;
    else heroContentDiv = childDiv;
  }

  // Step 2: Find the <p> containing <picture> for the image row
  let imageElement = null;
  const pWithPicture = heroContentDiv.querySelector('p picture');
  if (pWithPicture) {
    const parentP = pWithPicture.closest('p');
    if (parentP && heroContentDiv.contains(parentP)) {
      imageElement = parentP;
    }
  }

  // Step 3: Gather all elements for the content row (heading, subheading, paragraph, CTA, etc)
  // Exclude the image <p> and empty <p>
  const contentElements = [];
  Array.from(heroContentDiv.children).forEach((child) => {
    // Exclude the image <p>
    if (imageElement && child === imageElement) return;
    // Exclude empty <p>
    if (child.tagName === 'P' && child.textContent.trim() === '' && child.querySelectorAll('*').length === 0) return;
    contentElements.push(child);
  });

  // Step 4: Always create three rows, even if one is empty
  const cells = [
    ['Hero'],
    [imageElement ? imageElement : ''],
    [contentElements.length > 0 ? contentElements : '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
