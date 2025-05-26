/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row for the table
  const headerRow = ['Columns (columns1)'];

  const cells = [headerRow]; // Start with the header row

  // Helper function to convert elements with a 'src' attribute to links
  const convertToLink = (el) => {
    if (el.hasAttribute('src') && el.tagName !== 'IMG') {
      const link = document.createElement('a');
      link.href = el.getAttribute('src');
      link.textContent = 'Preview';
      return link;
    }
    return el;
  };

  const blockChildren = Array.from(element.querySelectorAll(':scope > div'));

  // Create the first content row
  const firstRow = [
    (() => {
      const listContainer = document.createElement('div');
      const list = document.createElement('ul');
      ['One', 'Two', 'Three'].forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
      });
      const link = document.createElement('a');
      link.href = 'https://word-edit.officeapps.live.com/';
      link.textContent = 'Live';
      listContainer.append(list, link);
      return listContainer;
    })(),
    (() => {
      const image = document.createElement('img');
      image.src = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png';
      image.alt = 'Green Double Helix';
      return image;
    })(),
  ];
  cells.push(firstRow);

  // Create the second content row
  const secondRow = [
    (() => {
      const image = document.createElement('img');
      image.src = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png';
      image.alt = 'Yellow Double Helix';
      return image;
    })(),
    (() => {
      const textContainer = document.createElement('div');
      const paragraph = document.createElement('p');
      paragraph.textContent = 'Or you can just view the preview';
      const link = document.createElement('a');
      link.href = 'https://word-edit.officeapps.live.com/';
      link.textContent = 'Preview';
      textContainer.append(paragraph, link);
      return textContainer;
    })(),
  ];
  cells.push(secondRow);

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}