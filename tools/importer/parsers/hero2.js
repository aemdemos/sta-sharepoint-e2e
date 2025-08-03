/* global WebImporter */
export default function parse(element, { document }) {
  // Find the relevant content div that contains the hero content
  // Expected structure: section.hero-container > .hero-wrapper > .hero.block > div > div
  let contentDiv = null;
  const heroWrapper = element.querySelector('.hero-wrapper');
  if (heroWrapper) {
    const heroBlock = heroWrapper.querySelector('.hero.block');
    if (heroBlock) {
      const innerDivs = heroBlock.querySelectorAll(':scope > div > div');
      if (innerDivs.length > 0) {
        contentDiv = innerDivs[0];
      }
    }
  }
  // Fallback: use the element itself if structure is not matched
  if (!contentDiv) contentDiv = element;

  // Find the picture or image for row 2
  let pictureEl = contentDiv.querySelector('picture');
  if (!pictureEl) {
    pictureEl = contentDiv.querySelector('img'); // fallback to img if picture not present
  }

  // Prepare row after image: all elements after <picture> (or <img> if picture missing)
  let afterPictureContent = [];
  if (pictureEl && pictureEl.parentElement) {
    let sibling = pictureEl.parentElement.nextElementSibling;
    while (sibling) {
      // Only add if not an empty <p> or empty element
      if (sibling.tagName !== 'P' || sibling.textContent.trim().length > 0) {
        afterPictureContent.push(sibling);
      }
      sibling = sibling.nextElementSibling;
    }
  } else {
    // If no image, use all h1-h3, p, a, button in contentDiv as a fallback
    const fallbackEls = contentDiv.querySelectorAll('h1, h2, h3, p, a, button');
    fallbackEls.forEach((el) => {
      if (el.textContent.trim().length > 0) {
        afterPictureContent.push(el);
      }
    });
  }

  // Handle edge case: if afterPictureContent is empty, ensure at least the heading is included
  if (afterPictureContent.length === 0) {
    // Try to find a heading
    const heading = contentDiv.querySelector('h1, h2, h3');
    if (heading) {
      afterPictureContent.push(heading);
    }
  }

  // Build the table rows
  const headerRow = ['Hero'];
  const imageRow = [pictureEl || ''];
  const contentRow = [afterPictureContent];

  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
