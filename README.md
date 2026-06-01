# Math Knight / Математический рыцарь

Mobile-first fantasy RPG MVP для тренировки математики у детей 5–10 лет.

## Stage 2 возможности

- 10 глав, 100 тем, 3 подуровня на тему и 10 мини-заданий на подуровень.
- Задания не хранятся вручную: они генерируются правилами тем в `src/game/questionGenerators.ts`.
- Зеленая Опушка использует 4 варианта ответа, остальные главы используют ручной ввод.
- Устойчивое сравнение ответов: `4`, `04`, пробелы и слова `больше`, `меньше`, `равно` поддерживаются.
- Создание персонажа: имя, класс, цвет плаща и бонус класса.
- Марафон быстрого счёта с 3 сложностями, комбо, рекордом и наградами.
- Магазин с редкостью предметов, коллекция, сундуки, настройки звука/UI/text size.
- Единая заменяемая система иконок через `src/data/iconRegistry.ts` и `src/components/ui/IconBadge.tsx`.
- PWA-ready структура с `public/manifest.webmanifest`.

## Стек

- React
- Vite
- TypeScript
- localStorage
- Web Audio API для лёгких звуков
- Mobile-first glassmorphism UI

## Команды

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Структура

```text
src/
  main.tsx
  App.tsx
  components/
    ui/
  screens/
  game/
  data/
  storage/
  assets/icons/
  styles/
```
