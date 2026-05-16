# Meditation Landing Page ️

Современный лендинг для медитации с использованием TypeScript, Vite и SCSS.

## 🌐 Live Demo

[andreymalyar.github.io/meditation-landing](https://andreymalyar.github.io/meditation-landing/)

## 🚀 Технологии

- **Vite** - быстрая сборка
- **TypeScript** - типизированный JavaScript
- **SCSS** - препроцессор CSS
- **Jest** - unit-тесты
- **Cypress** - E2E-тесты
- **ESLint** - линтер кода
- **Prettier** - форматирование кода
- **Husky** - Git hooks

## 📦 Установка

```bash
npm install
```

## 🛠️ Разработка

Запуск dev-сервера:

```bash
npm run dev
```

Проект откроется по адресу: `http://localhost:5173`

## 🧪 Тестирование

Запуск тестов:

```bash
npm test
```

Запуск тестов в watch-режиме:

```bash
npm run test:watch
```

Проверка покрытия тестами:

```bash
npm run test:coverage
```

## 🔍 Линтинг

Проверка кода:

```bash
npx eslint src
```

Автоисправление:

```bash
npx eslint src --fix
```

Проверка форматирования:

```bash
npx prettier --check src
```

Форматирование кода:

```bash
npx prettier --write src
```

## 🏗️ Сборка

Production сборка:

```bash
npm run build
```

Предпросмотр собранного проекта:

```bash
npm run preview
```

## 📁 Структура проекта

```
meditation_100125/
├── .husky/              # Git hooks
├── public/              # Статические файлы
├── src/                 # Исходный код
│   ├── __tests__/       # Тесты
│   ├── main.ts          # Точка входа
│   ├── style.css        # Стили
│   └── setupTests.ts    # Настройка тестов
├── .eslintrc.json       # Конфиг ESLint
├── .prettierrc          # Конфиг Prettier
├── .gitignore           # Git ignore
├── jest.config.cjs      # Конфиг Jest
├── package.json         # Зависимости
├── tsconfig.json        # Конфиг TypeScript
└── index.html           # HTML шаблон
```

## 📝 Git Workflow

При каждом коммите автоматически запускаются:

- ESLint (проверка кода)
- Prettier (форматирование)

## 👨‍💻 Автор

Создано: 10.01.2025

## 📄 Лицензия

MIT
