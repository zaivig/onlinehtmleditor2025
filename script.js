// Инициализация CodeMirror
const editor = CodeMirror.fromTextArea(document.getElementById('html-editor'), {
  mode: 'htmlmixed',
  theme: 'dracula',
  lineNumbers: true,
  autoCloseTags: true,
  matchBrackets: true,
  extraKeys: { 'Ctrl-Space': 'autocomplete' },
  gutters: ['CodeMirror-lint-markers'],
  lint: true,
});

// Обновление предпросмотра
function updatePreview() {
  const code = editor.getValue();
  const preview = document.getElementById('preview');
  preview.srcdoc = code;
}

editor.on('change', updatePreview);

// Сохранение кода
document.getElementById('save-btn').addEventListener('click', () => {
  const code = editor.getValue();
  const blob = new Blob([code], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'my-html-file.html';
  a.click();
  URL.revokeObjectURL(url);
});

// Переключение темы
document.getElementById('theme-toggle').addEventListener('click', () => {
  const body = document.body;
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    editor.setOption('theme', 'eclipse');
    document.getElementById('theme-toggle').textContent = 'Тёмная тема';
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    editor.setOption('theme', 'dracula');
    document.getElementById('theme-toggle').textContent = 'Светлая тема';
  }
});

// Переключение языка
function updateFooterText(lang) {
  const footerText = document.getElementById('footer-text');
  const footerContact = document.getElementById('footer-contact');
  const footerLove = document.getElementById('footer-love');

  if (lang === 'ru') {
    footerText.innerHTML = 'Загороднов Иван 2025';
    footerText.innerHTML = 'Сайт создан в рамках проекта <a href="https://ваш-сайт-школы.рф" target="_blank">МАОУ СМТЛ</a>.';
    footerContact.innerHTML = 'По вопросам и предложениям пишите на <a href="mailto:zaivig2011@gmail.com">zaivig2011@gmail.com</a>.';
    
  } else {
    footerText.innerHTML = 'Site created as part of the project <a href="https://ваш-сайт-школы.рф" target="_blank">MAOU SMTL</a>.';
    footerContact.innerHTML = 'For questions and suggestions, write to <a href="mailto:zaivig2011@gmail.com">zaivig2011@gmail.com</a>.';
  }
}

document.getElementById('lang-ru').addEventListener('click', () => {
  document.documentElement.lang = 'ru';
  document.querySelector('header h1').textContent = 'Онлайн редактор HTML 5';
  editor.setOption('placeholder', 'Введите ваш HTML код...');
  updateFooterText('ru');
});

document.getElementById('lang-en').addEventListener('click', () => {
  document.documentElement.lang = 'en';
  document.querySelector('header h1').textContent = 'Online HTML 5 Editor';
  editor.setOption('placeholder', 'Enter your HTML code...');
  updateFooterText('en');
});