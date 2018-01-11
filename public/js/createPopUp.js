const select = selector => document.querySelector(selector);
const create = type => document.createElement(type);


const createPopup = (msgContent, bgColor) => {
  const section = create('section');
  section.className = 'popup-section';
  const sectionMsg = create('h3');
  sectionMsg.className = 'popup-msg';
  sectionMsg.style.backgroundColor = bgColor;
  sectionMsg.textContent = msgContent;
  section.appendChild(sectionMsg);
  section.addEventListener('click', (e) => {
    e.preventDefault();
    select('body').removeChild(section);
  });
  select('body').appendChild(section);
};
