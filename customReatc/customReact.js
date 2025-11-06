function customRender(reactElement, container) {

//   const domElement = document.createElement(reactElement.type);

  
//   domElement.setAttribute('href', reactElement.props.href);
//   domElement.setAttribute('target', reactElement.props.target);

 
//   domElement.innerHTML = reactElement.children;
//   container.appendChild(domElement);

const domElement = document.createElement(reactElement.type)
  domElement.innerHTML = reactElement.children;
  

}

const reactElement = {
  type: 'a',
  props: {
    href: 'https://www.google.com/',
    target: '_blank',
  },
  children: 'Click me to go to Google',
};

const mainContainer = document.querySelector('#root');

customRender(reactElement, mainContainer);
