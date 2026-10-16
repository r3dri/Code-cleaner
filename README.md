<div align="center">

# 🧹 Code Cleaner

### Локальная очистка кода от комментариев ИИ и отладочного мусора

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?logo=github)](https://r3dri.github.io/code-cleaner/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-f7df1e?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

<div align="center">

<svg width="600" height="200" viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    @keyframes scan {
      0% { transform: translateX(-50px); opacity: 0; }
      20% { opacity: 1; }
      80% { opacity: 1; }
      100% { transform: translateX(350px); opacity: 0; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
    }
    @keyframes fadeClean {
      0%, 40% { opacity: 0.3; }
      60%, 100% { opacity: 1; }
    }
    @keyframes pulse {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 0.4; }
    }
    .scanner { animation: scan 3s infinite ease-in-out; }
    .floating { animation: float 3s infinite ease-in-out; }
    .clean-code { animation: fadeClean 3s infinite ease-in-out; }
    .pulse-bg { animation: pulse 3s infinite ease-in-out; }
  </style>
  
  <rect width="600" height="200" rx="16" fill="#1c1c1e" />
  
  <g transform="translate(40, 40)" opacity="0.6">
    <rect width="180" height="120" rx="8" fill="#2c2c2e" />
    <text x="20" y="30" fill="#ff3b30" font-family="monospace" font-size="11">/* Вот ваш код 🤖 */</text>
    <text x="20" y="50" fill="#86868b" font-family="monospace" font-size="11">print("---")</text>
    <text x="20" y="70" fill="#f5f5f7" font-family="monospace" font-size="11">x = 5</text>
    <text x="20" y="90" fill="#86868b" font-family="monospace" font-size="11"># Hope this helps</text>
    <text x="140" y="90" font-size="14">🗑️</text>
  </g>

  <g transform="translate(260, 60)">
    <rect class="pulse-bg" width="80" height="80" rx="16" fill="#007aff" />
 
    <g class="floating">
      <path d="M40 20 L60 35 L60 55 L40 70 L20 55 L20 35 Z" fill="none" stroke="#007aff" stroke-width="3" />
      <path d="M40 30 L40 50 M32 40 L48 40" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
    </g>
  </g>

  <rect class="scanner" x="0" y="30" width="4" height="140" fill="#007aff" filter="drop-shadow(0 0 8px #007aff)" />

  <g transform="translate(380, 40)" class="clean-code">
    <rect width="180" height="120" rx="8" fill="#2c2c2e" stroke="#007aff" stroke-width="1" />
    <text x="20" y="50" fill="#f5f5f7" font-family="monospace" font-size="11">x = 5</text>
    <text x="140" y="90" font-size="14">✨</text>
  </g>
</svg>

<br>

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