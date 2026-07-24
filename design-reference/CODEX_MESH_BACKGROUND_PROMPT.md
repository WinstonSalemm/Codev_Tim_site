# Codex Prompt — Exact Mesh Background Port (Codev Tim → FinancialERP MAUI)

Скопируй блок ниже целиком в Codex.

---

## PROMPT START

Ты работаешь в репозитории **FinancialERP** (.NET MAUI), путь примерно:
`C:\Users\Legion\Desktop\financialProject`

### Цель

Заменить текущую упрощённую ambient-mesh анимацию на **бит-в-бит эквивалент** фоновой анимации сайта **Codev Tim** (Obsidian Console Mesh).

Эталонный алгоритм уже существует на сайте (НЕ менять сайт):

- `C:\Users\Legion\Desktop\my own site\src\features\background\MeshBackground.tsx`
- `C:\Users\Legion\Desktop\my own site\src\features\background\mesh-palette.ts`
- `C:\Users\Legion\Desktop\my own site\src\styles\mesh-background.css`
- dark tokens в `C:\Users\Legion\Desktop\my own site\src\styles\tokens.css` (`--mesh-*`)

В FinancialERP сейчас есть **неверный** приближённый порт:

- `src/FinancialERP.Client/Services/AmbientBackgroundService.cs`
- `src/FinancialERP.Client/Controls/ErpAmbientBackground.cs`
- `src/FinancialERP.Client/Design/Tokens/AmbientMotionTokens.cs`
- вставка в `AppShellPage.xaml.cs` (`ErpAmbientBackground` + shell pointer)

**Перепиши эти файлы так, чтобы поведение совпало с сайтом.** Не «улучшай», не упрощай, не меняй константы «на вкус».

Финансовый ERP использует **только dark theme** (Signal Amber). Light-theme ветки сайта (`isLight`, clustering, centerClarity) реализуй как код-ветви с `isLight = false` **или** полностью опусти light-only поведение, сохранив dark-path идентичным.

---

### Что должно получиться визуально (3 слоя, как на сайте)

Слой 0 — фон контейнера: solid `#000000` (или текущий `ThemeResource.Background`, если он уже `#000000`).

Слой 1 — **canvas / GraphicsView**: точки + соединяющие линии (основная анимация).

Слой 2 — **mouse glow**: круг **600×600 CSS px**, то есть радиус визуального градиента соответствует `GLOW_RADIUS = 300` смещению центра.  
CSS градиент (dark):

```
radial-gradient(circle,
  rgba(240,180,41,0.09) 0%,
  rgba(240,180,41,0.035) 38%,
  rgba(240,180,41,0) 70%)
```

Позиционирование: `translate3d(mouseX - 300, mouseY - 300, 0)` когда мышь активна; иначе увести за экран (`-9999`).

Слой 3 — **vignette** поверх canvas:

```
radial-gradient(ellipse 85% 85% at 50% 50%,
  transparent 40%,
  rgba(0,0,0,0.55) 100%)
```

Все слои:

- на весь RootGrid (как сейчас Insert(0))
- `InputTransparent = true` для визуальных слоёв, НО pointer tracking должен продолжать работать на уровне shell (как сейчас через `RootGrid` PointerGestureRecognizer) — не ломай существующую схему доставки координат.
- `z-order`: background → mesh → UI chrome поверх
- `pointer-events: none` эквивалент: анимация не перехватывает клики UI

---

### Палитра DARK (захардкодь точно)

```
node RGB     = (240, 180, 41)   // #F0B429
line RGB     = (240, 180, 41)
nodeAlpha    = 1
lineAlpha    = 1
density      = 1
glowInner    = rgba(240,180,41,0.09)
glowMid      = rgba(240,180,41,0.035)
glowOuter    = rgba(240,180,41,0)
vignette     = rgba(0,0,0,0.55)
bgBase       = #000000
```

---

### Константы — КОПИРОВАТЬ БУКВАЛЬНО (из MeshBackground.tsx)

```csharp
const int NODE_COUNT_MIN = 55;
const int NODE_COUNT_MAX = 110;
const int NODE_AREA_DIVISOR = 14000;

const float CONN_DIST = 160f;
const float CONN_DIST_SQ = CONN_DIST * CONN_DIST; // 25600

const float MOUSE_DIST = 220f;
const float MOUSE_DIST_SQ = MOUSE_DIST * MOUSE_DIST; // 48400
const float MOUSE_REPULSE = 0.013f;
const float MOUSE_ATTRACT_NEAR = 0.004f;

const float MAX_SPEED = 1.1f;
const float SPEED_DAMP = 0.998f;

const float GLOW_RADIUS = 300f; // для позиционирования glow-слоя (центр = mouse - 300)
const float GRID_CELL = CONN_DIST; // 160
```

---

### Модель Node (точно как на сайте)

```csharp
struct MeshNode {
  float X, Y;
  float Vx, Vy;
  float R;       // radius
  float Depth;   // 0.3..1.0
  float Phase;   // 0..2π
}
```

---

### resolveNodeCount(width, height, density=1)

```
area = width * height
base = clamp(round(area / 14000), 55, 110)
return max(28, round(base * density))
```

При `density=1` это обычно 55..110 в зависимости от площади окна.

На **каждом resize** узлы **пересоздаются** (как `resize()` на сайте), не масштабируются.

---

### createNodes(count, width, height, clustered=false)

Для dark: `clustered = false`.

Для каждого i:

```
depth = 0.3 + random() * 0.7
x = random() * width
y = random() * height
vx = (random() - 0.5) * 0.28 * depth
vy = (random() - 0.5) * 0.28 * depth
r  = 0.6 + depth * 1.6          // dark (не clustered)
phase = random() * PI * 2
```

(Light clustered path на сайте есть — для ERP не нужен.)

---

### Pointer / mouse state (критично)

На сайте:

```
mouse = { x, y, tx, ty }  // текущие и target
pointermove → tx,ty = clientX,clientY  (абсолютные px окна)
pointerleave → tx,ty = -9999
каждый кадр:
  x += (tx - x) * 0.1
  y += (ty - y) * 0.1
hasMouse = tx > -9000
```

**Переделай** текущий MAUI pointer API:

- Сейчас: нормализованные `-1..1` + «гравитация» + parallax — **УДАЛИТЬ**.
- Нужно: абсолютные координаты в системе GraphicsView / RootGrid (`clientX/Y` эквивалент).
- Shell `PointerMoved` должен передавать **пиксели** `X,Y` относительно фона, не normalized.
- `PointerExited` → target = (-9999, -9999).

Glow слой двигается за **сглаженными** `mouse.x/y`, не за raw target.

---

### Simulation step (каждый кадр анимации, как requestAnimationFrame)

На сайте **нет delta-time**. Кадр = 1 шаг.  
`state.t += 0.008` **каждый кадр**, не `* dt`.

В MAUI:

- используй `DispatcherTimer` ~16ms (≈60fps) **ИЛИ** лучше `CompositionTarget`/continuous invalidate, но **формулы должны быть per-frame как на сайте**, а не physics-per-second.
- Если оставишь timer: `Advance()` = один site-frame (t += 0.008), без умножения скоростей на deltaSeconds.
- Удали текущие `MaxSpeed=...` в px/sec и gravity strength 420 — они не от эталона.

Алгоритм update для каждого node:

```
1) Organic wobble:
   vx += sin(t + phase) * 0.002
   vy += cos(t * 0.7 + phase * 1.3) * 0.002

2) Mouse interaction if hasMouse:
   dsq = distSq(node, mouse)
   if dsq < MOUSE_DIST_SQ:
     d = sqrt(dsq)
     f = 1 - d / MOUSE_DIST
     factor = (d < MOUSE_DIST * 0.5)
         ? -MOUSE_REPULSE * f                 // сильное отталкивание близко
         :  MOUSE_ATTRACT_NEAR * f * 0.3      // лёгкое притяжение дальше
     vx += ((x - mouse.x) / d) * factor
     vy += ((y - mouse.y) / d) * factor

3) Damping & clamp:
   vx *= 0.998
   vy *= 0.998
   sp = sqrt(vx*vx + vy*vy)
   maxSp = MAX_SPEED * depth   // 1.1 * depth
   if sp > maxSp: vx,vy *= maxSp/sp

4) Integrate:
   x += vx
   y += vy

5) Soft bounce on edges:
   if x < 0:      vx = abs(vx);  x = 0
   if x > width:  vx = -abs(vx); x = width
   if y < 0:      vy = abs(vy);  y = 0
   if y > height: vy = -abs(vy); y = height
```

---

### Spatial hash для связей (как на сайте)

```
GRID_CELL = 160
cellKey(col, row) = col * 100000 + row
```

Положить индексы нод в buckets.  
Для каждой ноды `i` проверять только соседние cells `dc,dr ∈ {-1,0,1}` и `j > i`.

Связь если `dsq < CONN_DIST_SQ`.

---

### Draw connections (dark path, isLight=false)

Для каждой пары в радиусе:

```
t = 1 - sqrt(dsq) / CONN_DIST
depth = (a.depth + b.depth) * 0.5
mx, my = midpoint
clarity = 1   // dark: centerClarity disabled

boost = 1
if hasMouse and distSq(mid, mouse) < MOUSE_DIST_SQ:
  boost = 1 + (1 - sqrt(md)/MOUSE_DIST) * 2.5

globalAlpha = min(1, t * 0.22 * depth * boost * lineAlpha * clarity)
lineWidth   = 0.5 + t * depth * 0.8 * (boost > 1 ? 1.2 : 1)

stroke color = rgb(240,180,41) with alpha = globalAlpha
draw line a→b
```

Важно: на сайте `lineWidth` меняется **на каждую линию**. В MAUI `ICanvas.StrokeSize` тоже ставь per-line.

---

### Draw nodes (dark)

Для каждой ноды:

```
pulse = 0.85 + sin(t * 1.8 + phase) * 0.15
clarity = 1

# Halo near mouse (только если очень близко):
if hasMouse and dsq < MOUSE_DIST_SQ * 0.4:
  intensity = max(0, 1 - sqrt(dsq) / (MOUSE_DIST * 0.632))
  haloR = max(0.1, r * 4 * intensity)
  if intensity > 0:
    radial gradient center→haloR:
      stop0: rgba(240,180,41, 0.3 * intensity * depth * nodeAlpha * clarity)
      stop1: rgba(240,180,41, 0)
    fill circle halo

# Core dot:
rDraw = r * pulse
alpha  = (0.35 + depth * 0.45) * pulse * nodeAlpha * clarity
fill rgb(240,180,41) with alpha
fill circle (x,y,rDraw)
```

В MAUI для halo: аппроксимируй радиальным градиентом через несколько полупрозрачных кругов **ИЛИ** SkiaSharp `SKShader.CreateRadialGradient`, если уже есть Skia. Предпочтительно точный radial gradient. Не заменяй halo одним плоским кругом как сейчас (`#18F0B429` / 58px) — это НЕ эталон.

---

### Mouse glow слой (не рисовать «курсор-точку»)

Текущий MAUI drawable рисует у курсора круги 58/22/3.5 — **удали**.  
Вместо этого отдельный overlay (BoxView / Border / второй GraphicsView / AbsoluteLayout child) размером **600×600**, с radial brush как CSS, Transform/Translation = `(mouseX - 300, mouseY - 300)`.

Когда `!hasMouse` — скрыть (`IsVisible=false` или Translation=-9999, Opacity=0).

---

### Vignette слой

Полноэкранный overlay с radial brush:

- центр прозрачный до 40%
- края `rgba(0,0,0,0.55)`
- ellipse ~85% × 85% (визуально затемнение к краям)

Не кликабелен.

---

### Resize / DPR

На сайте:

```
dpr = min(devicePixelRatio, 2)
canvas.width = floor(cssW * dpr)
canvas.height = floor(cssH * dpr)
ctx.setTransform(dpr,0,0,dpr,0,0)
// дальше все координаты в CSS px
```

В MAUI GraphicsView обычно уже в DIP. Рисуй в DIP как CSS px. Не удваивай размеры нод.

На SizeChanged / SetBounds: если размер изменился — **пересоздай nodes** через `resolveNodeCount` + `createNodes`.

---

### Visibility / reduced motion

- Если окно не активно / page not visible — останавливай timer (аналог `document.visibilityState`).
- Если `Accessibility.ReduceMotion` / platform reduced-motion доступен — один static render без rAF loop (алгоритм `renderStatic` на сайте: линии alpha `t*0.12*avgDepth`, dots alpha `0.3*depth`, lineWidth 0.75, без mouse glow). Для ERP желательно поддержать, но dark animated path — приоритет.

---

### Что удалить из текущего FinancialERP порта (он НЕ эталон)

Удали / не оставляй:

- фиксированный `NodeCount` без зависимости от площади
- скорости 15..60 px/sec + `deltaSeconds`
- pointer gravity radius 50 / strength 420
- normalized pointer -1..1
- parallax смещение в `GetNode`
- курсорные круги 58/22/3.5
- любые «улучшения» прозрачности/скорости

---

### Интеграция

Сохрани точку встраивания в `AppShellPage`: фон под UI.  
Обнови DI registration `AmbientBackgroundService` если сигнатуры изменятся.  
`ErpAmbientBackground` должен:

1. держать GraphicsView (mesh)
2. glow overlay
3. vignette overlay
4. подписываться на Absolute pointer px из shell **или** сам слушать pointer, если shell передаёт px

Сделай `InputTransparent=true` на ambient control, чтобы клики проходили в UI; pointer tracking оставь на RootGrid, но передавай **пиксельные** координаты.

---

### Критерии приёмки (обязательные)

1. На тёмном фоне `#000` плавает сеть янтарных точек `#F0B429` со связями ≤160px.
2. Число точек зависит от площади окна (55–110, density 1).
3. Точки медленно «дышат» (pulse) и имеют лёгкий organic wobble.
4. Курсор: ближние точки отталкиваются, чуть дальше — слабое притяжение; линии около курсора ярче/толще (`boost`).
5. У очень близких точек — мягкий radial halo.
6. Под курсором большой мягкий glow 600px (не яркая точка).
7. По краям vignette 55% чёрного.
8. Нет parallax-сдвига всей сетки от normalized pointer.
9. Анимация не блокирует клики UI.
10. Визуально неотличимо от сайта Codev Tim dark mesh при side-by-side сравнении.

---

### Метод работы

1. Прочитай эталон `MeshBackground.tsx` целиком.
2. Перепиши `AmbientBackgroundService` как порт simulation+state.
3. Перепиши `ErpAmbientBackground` + drawable как порт render + CSS layers.
4. Обнови tokens/константы.
5. Обнови pointer wiring в `AppShellPage`.
6. Собери клиент, проверь Windows target.
7. Не трогай сайт `my own site`.
8. Не рефакторь ERP UI вокруг — только ambient background.

## PROMPT END
