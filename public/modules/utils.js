const onTabKey = (e, obj) => {
  if (e.keyCode != 9) return;
  e.preventDefault();

  for (let i = 0; i < 4; i++) {
    let cursorPosition = obj.selectionStart;
    let cursorLeft = obj.value.substr(0, cursorPosition);
    let cursorRight = obj.value.substr(cursorPosition, obj.value.length);

    obj.value = cursorLeft + " " + cursorRight;
    obj.selectionEnd = cursorPosition + 1;
  }
};

export { onTabKey };
