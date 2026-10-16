<div align="center">

# 🧹 Code Cleaner

### Локальная очистка кода от комментариев ИИ и отладочного мусора

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?logo=github)](https://r3dri.github.io/code-cleaner/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-f7df1e?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

**Ваш код остаётся на вашем устройстве. Никаких серверов. Полная приватность.**

<div align="center">
  <a href="https://r3dri.github.io/code-cleaner/" target="_blank">
    <img src="https://img.shields.io/badge/_Открыть_приложение-007AFF?style=for-the-badge&logo=rocket&logoColor=white" alt="Открыть приложение">
  </a>
</div>

</div>

---

## 📖 О проекте

**Code Cleaner** — это мощный локальный инструмент для разработчиков, который помогает очистить ваш код от:

- 🤖 Комментариев и пояснений, добавленных нейросетями (ChatGPT, Claude, Gemini и др.)
- 🐛 Отладочных выводов с разделителями (`print("---")`, `console.log("===")`)
- 💬 Избыточных комментариев, не несущих смысловой нагрузки

Всё работает **полностью в вашем браузере** — файлы никогда не покидают ваше устройство.

---

## Возможности

<table>
<tr>
<td width="50%">

### 🔒 Приватность
- 100% локальная обработка
- Никаких сетевых запросов
- Ваши данные в безопасности

</td>
<td width="50%">

### 🎨 Современный UI
- Тёмная и светлая темы
- Apple-like дизайн
- Плавные анимации

</td>
</tr>
<tr>
<td width="50%">

### 🚀 Производительность
- Мгновенная обработка
- Поддержка файлов до 5 МБ
- Оптимизированные алгоритмы

</td>
<td width="50%">

### 📊 Статистика
- Время обработки
- Количество удалённых комментариев
- Количество удалённых выводов

</td>
</tr>
</table>

### Три уровня агрессивности

1. **Мягкая** — удаляет только очевидные мета-комментарии ИИ ("Вот ваш код", "Here is the example")
2. **Средняя** — удаляет комментарии ИИ + отладочные выводы с разделителями
3. **Агрессивная** — удаляет ВСЕ комментарии и ВСЕ операторы вывода

---

## 🌍 Поддерживаемые языки и форматы

<div align="center">

### 💻 Языки программирования

[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](#)
[![Java](https://img.shields.io/badge/Java-ED8B00?logo=openjdk&logoColor=white)](#)
[![Go](https://img.shields.io/badge/Go-00ADD8?logo=go&logoColor=white)](#)
[![Rust](https://img.shields.io/badge/Rust-000000?logo=rust&logoColor=white)](#)
[![PHP](https://img.shields.io/badge/PHP-777BB4?logo=php&logoColor=white)](#)
[![Ruby](https://img.shields.io/badge/Ruby-CC342D?logo=ruby&logoColor=white)](#)
[![C](https://img.shields.io/badge/C-A8B9CC?logo=c&logoColor=black)](#)
[![C++](https://img.shields.io/badge/C++-00599C?logo=cplusplus&logoColor=white)](#)
[![C#](https://img.shields.io/badge/C%23-239120?logo=csharp&logoColor=white)](#)
[![SQL](https://img.shields.io/badge/SQL-4479A1?logo=postgresql&logoColor=white)](#)

### 📄 Разметка и текст

[![HTML](https://img.shields.io/badge/HTML-E34F26?logo=html5&logoColor=white)](#)
[![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=white)](#)
[![TXT](https://img.shields.io/badge/TXT-PlainText-888888?logo=notepad&logoColor=black)](#)

</div>


---

## Использование

### Онлайн (через GitHub Pages)

1. Перейдите на [демо-страницу](https://r3dri.github.io/code-cleaner/)
2. Перетащите файл в зону загрузки или нажмите для выбора
3. Выберите уровень агрессивности очистки
4. Нажмите "Очистить код"
5. Скопируйте результат или скачайте файл

### Локально

```bash
# Клонируйте репозиторий
git clone https://github.com/r3dri/code-cleaner.git

# Откройте index.html в браузере
cd code-cleaner
open index.html  # macOS
# или
xdg-open index.html  # Linux
# или просто дважды кликните на файл