function solution(element) {
    // const elements = [element]; // массив для хранения обрабатываемых элементов
    // let currentLevel = 0; // текущий уровень обработки

    // while (currentLevel < elements.length) {
    //     const currentElement = elements[currentLevel];
    //     const childNodes = Array.from(currentElement.children);
    //     alert(childNodes);
    //     currentLevel += 1;
    alert(element.childNodes[0]);

}

const entryElement = document.querySelector('entry');

const result = solution(entryElement);
alert(document.body);
// alert(result);
