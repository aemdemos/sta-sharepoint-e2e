/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the cards block within the wrapper
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;

  // Find all card <li> elements
  const cardItems = cardsBlock.querySelectorAll('ul > li');
  if (!cardItems.length) return;

  // Prepare the header row for the Tabs block
  const headerRow = ['Tabs (tabs4)'];
  const rows = [headerRow];

  // For each card, extract tab label and tab content
  cardItems.forEach((li) => {
    // Defensive: find the card body
    const body = li.querySelector('.cards-card-body');
    if (!body) return;
    // The first <p><strong> is the tab label
    const labelP = body.querySelector('p > strong');
    let tabLabel = '';
    if (labelP) {
      tabLabel = labelP.textContent.trim();
    } else {
      // fallback: use first <p> text
      const firstP = body.querySelector('p');
      tabLabel = firstP ? firstP.textContent.trim() : 'Tab';
    }

    // Tab content: image + all body content
    // Defensive: find the card image
    const imageDiv = li.querySelector('.cards-card-image');
    // Compose content fragment
    const contentFragment = document.createElement('div');
    if (imageDiv) contentFragment.appendChild(imageDiv);
    // Add all children of body (not just the label)
    Array.from(body.childNodes).forEach((node) => {
      contentFragment.appendChild(node.cloneNode(true));
    });

    // Remove the label <p> if it only contains the <strong> (to avoid duplicate label in content)
    const firstP = contentFragment.querySelector('p');
    if (firstP && firstP.childNodes.length === 1 && firstP.querySelector('strong')) {
      firstP.remove();
    }

    rows.push([tabLabel, contentFragment]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new block
  element.replaceWith(table);
}
