/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Locate the innermost hero content block
  let contentRoot = element;
  // If .hero-wrapper exists, drill down
  const wrapper = element.querySelector(':scope > .hero-wrapper');
  if (wrapper) {
    const heroBlock = wrapper.querySelector(':scope > .hero.block');
    if (heroBlock) {
      // Usually hero block contains a child div with content
      const blockDiv = heroBlock.querySelector(':scope > div');
      if (blockDiv) {
        contentRoot = blockDiv;
      } else {
        contentRoot = heroBlock;
      }
    } else {
      contentRoot = wrapper;
    }
  }

  // Drill down if there are single wrapping <div>s only
  let baseDiv = contentRoot;
  while (baseDiv && baseDiv.children.length === 1 && baseDiv.firstElementChild.tagName === 'DIV') {
    baseDiv = baseDiv.firstElementChild;
  }

  // Step 2: Extract background image (picture or img)
  let bgImage = null;
  // Look for <picture> first, possibly inside a <p>
  const picWrap = baseDiv.querySelector('picture');
  if (picWrap) {
    bgImage = picWrap;
  } else {
    // Fallback: direct <img> (should not happen with standard markup)
    const img = baseDiv.querySelector('img');
    if (img) bgImage = img;
  }

  // Step 3: Extract hero textual content, skipping the <picture> (and its parent <p> if that's all it contains)
  const contentEls = [];
  Array.from(baseDiv.children).forEach((child) => {
    // Skip <p> with only <picture> inside
    if ((child.tagName === 'P' && child.querySelector('picture')) || child.tagName === 'PICTURE') return;
    // Skip empty <p>
    if (child.tagName === 'P' && child.textContent.trim() === '') return;
    contentEls.push(child);
  });

  // Step 4: Build the block rows according to the Hero block spec
  // Always 1 column, 3 rows: header, image, text-content
  const rows = [
    ['Hero'],
    [bgImage ? bgImage : ''],
    [contentEls.length === 1 ? contentEls[0] : contentEls]
  ];

  // Step 5: Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
