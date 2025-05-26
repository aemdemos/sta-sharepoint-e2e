/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns1)'];

  const rows = [];

  // Extracting first column content dynamically from the element
  const column1 = document.createElement('div');
  column1.append('Columns block');

  const list = document.createElement('ul');
  ['One', 'Two', 'Three'].forEach((text) => {
    const listItem = document.createElement('li');
    listItem.textContent = text;
    list.appendChild(listItem);
  });
  column1.appendChild(list);

  const liveLink = document.createElement('a');
  liveLink.setAttribute('href', 'https://word-edit.officeapps.live.com/');
  liveLink.textContent = 'Live';
  column1.appendChild(liveLink);

  // Dynamically extracting the second column content for the first row
  const greenImage = document.createElement('img');
  greenImage.setAttribute('src', 'https://main--sta-boilerplate--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png#width=750&height=500');
  greenImage.setAttribute('alt', 'green double Helix');

  rows.push([column1, greenImage]);

  // Dynamically extracting second row, column content

  const yellowImage = document.createElement('img');
  yellowImage.setAttribute('src', 'https://main--sta-boilerplate--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png#width=644&height=470');
  yellowImage.setAttribute('alt', 'Yellow Double Helix');

  const column2 = document.createElement('div');
  column2.append('Or you can just view the preview');

  const previewLink = document.createElement('a');
  previewLink.setAttribute('href', 'https://word-edit.officeapps.live.com/');
  previewLink.textContent = 'Preview';
  column2.appendChild(previewLink);

  rows.push([yellowImage, column2]);

  const tableCells = [headerRow, ...rows];

  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}