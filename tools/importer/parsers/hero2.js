/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the hero image and heading
  // The structure is: element > .hero-wrapper > .hero.block > div > div > [content]
  let heroContent;
  // Try to find the deepest content container
  const heroWrapper = element.querySelector('.hero-wrapper');
  if (heroWrapper) {
    const heroBlock = heroWrapper.querySelector('.hero.block');
    if (heroBlock) {
      // The actual content is inside heroBlock's first child div
      const contentDiv = heroBlock.querySelector('div > div');
      if (contentDiv) {
        heroContent = contentDiv;
      } else {
        // Fallback: use heroBlock itself
        heroContent = heroBlock;
      }
    } else {
      // Fallback: use heroWrapper itself
      heroContent = heroWrapper;
    }
  } else {
    // Fallback: use element itself
    heroContent = element;
  }

  // Find the image (picture or img)
  let imageEl = null;
  // Look for <picture> inside heroContent
  const picture = heroContent.querySelector('picture');
  if (picture) {
    imageEl = picture;
  } else {
    // Fallback: look for <img>
    const img = heroContent.querySelector('img');
    if (img) imageEl = img;
  }

  // Find the heading (h1, h2, etc)
  let headingEl = null;
  // Prefer h1
  headingEl = heroContent.querySelector('h1');
  if (!headingEl) {
    // Fallback: look for h2 or h3
    headingEl = heroContent.querySelector('h2, h3');
  }

  // Compose table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imageEl ? imageEl : ''];
  // Compose text row: heading and any other text
  const textContent = [];
  if (headingEl) textContent.push(headingEl);
  // Optionally add subheading, paragraph, CTA if present
  // Find paragraphs after heading
  if (headingEl) {
    let next = headingEl.nextElementSibling;
    while (next) {
      // Only add if it's not empty
      if (next.tagName === 'P' && next.textContent.trim()) {
        textContent.push(next);
      }
      next = next.nextElementSibling;
    }
  }
  // If no heading found, fallback: add all text nodes
  if (!headingEl) {
    const paragraphs = heroContent.querySelectorAll('p');
    paragraphs.forEach(p => {
      if (p.textContent.trim()) textContent.push(p);
    });
  }
  // Defensive: if nothing found, add empty string
  const textRow = [textContent.length ? textContent : ''];

  // Build the table
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
