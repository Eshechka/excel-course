function toButton(button) {
  return `
    <div class="button ${button.active ? 'active' : ''}"
      data-type="button"
      data-value=${JSON.stringify(button.value)}
    >
      <i class="material-icons"
        data-type="button"
        data-value=${JSON.stringify(button.value)}
      >${button.icon}</i>
    </div>`;
}

export function createToolbar(state) {
  const buttons = [
    {
      icon: 'format_align_left',
      active: state.textAlign === `left`,
      value: {textAlign: `left`},
    },
    {
      icon: 'format_align_center',
      active: state.textAlign === `center`,
      value: {textAlign: state.textAlign === `center` ? `left` : `center`},
    },
    {
      icon: 'format_align_right',
      active: state.textAlign === `right`,
      value: {textAlign: state.textAlign === `right` ? `left` : `right`},
    },
    {
      icon: 'format_bold',
      active: state.fontWeight === `bold`,
      value: {fontWeight: state.fontWeight === `bold` ? `normal` : `bold`},
    },
    {
      icon: 'format_italic',
      active: state.fontStyle === `italic`,
      value: {fontStyle: state.fontStyle === `italic` ? `normal` : `italic`},
    },
    {
      icon: 'format_underlined',
      active: state.textDecoration === `underline`,
      value: {textDecoration: state.textDecoration ===`underline` ?
        `none` :
        `underline`},
    },
  ];
  const template = buttons.map(toButton).join('');
  return template;
}

