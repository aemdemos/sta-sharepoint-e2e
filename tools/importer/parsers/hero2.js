/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the relevant content block within the provided element
  let heroContent = element;
  // Check for .hero-wrapper > .hero.block > inner div > div (which houses content)
  const heroWrapper = element.querySelector('.hero-wrapper');
  if (heroWrapper) {
    const heroBlock = heroWrapper.querySelector('.hero.block');
    if (heroBlock) {
      // In AEM, hero block content is often nested within two <div>'s
      const innerBlocks = heroBlock.querySelectorAll(':scope > div > div');
      if (innerBlocks.length > 0) {
        heroContent = innerBlocks[0];
      } else {
        // fallback: get the first div inside heroBlock
        const fallback = heroBlock.querySelector(':scope > div');
        if (fallback) {
          heroContent = fallback;
        } else {
          heroContent = heroBlock;
        }
      }
    } else {
      heroContent = heroWrapper;
    }
  }

  // 2. Extract the image-containing <p> (or picture directly if no <p>)
  let imageEl = null;
  let textEls = [];

  // Find the first <picture> tag and its closest containing <p>
  const picture = heroContent.querySelector('picture');
  if (picture) {
    imageEl = picture.closest('p') || picture;
  }

  // 3. Extract remaining elements for the hero text (heading, etc.), excluding the image <p>
  // Only immediate children
  const children = Array.from(heroContent.children);
  textEls = children.filter(el => {
    // Exclude the <p> containing picture
    if (imageEl && el === imageEl) return false;
    // Exclude empty paragraphs
    if (el.tagName.toLowerCase() === 'p' && el.textContent.trim() === '') return false;
    return true;
  });

  // If there are no textEls (edge case, e.g. only image), fill with empty string
  let textCell;
  if (textEls.length === 0) {
    textCell = '';
  } else if (textEls.length === 1) {
    textCell = textEls[0];
  } else {
    textCell = textEls;
  }

  // 4. Compose the table rows according to the required structure
  const rows = [
    ['Hero'],
    [imageEl ? imageEl : ''],
    [textCell]
  ];
  
  // 5. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
