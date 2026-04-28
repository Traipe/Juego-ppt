<div align="center">

# 🐾 Piedra · Papel · Tijera
### La versión gatuna

**Un juego de Piedra Papel Tijera con garritas de gato negro, almohadillas rosas y vibraciones neón.**  
Vanilla HTML · CSS · JavaScript — sin dependencias, sin frameworks, sin instalación.

<br>

![HTML5](https://img.shields.io/badge/HTML5-001c00?style=for-the-badge&logo=html5&logoColor=ff65e0)
![CSS3](https://img.shields.io/badge/CSS3-004d3c?style=for-the-badge&logo=css3&logoColor=ff65e0)
![JavaScript](https://img.shields.io/badge/JavaScript-001c00?style=for-the-badge&logo=javascript&logoColor=ff8ec4)
![Sin dependencias](https://img.shields.io/badge/dependencias-ninguna-ff65e0?style=for-the-badge)

</div>

---

## ✨ ¿Qué es esto?

Una versión temática del clásico Piedra Papel Tijera donde las manos humanas son reemplazadas por **garritas de gato negro con almohadillas rosas**. Juega 3 rondas contra la CPU y descubre si eres digno de los bigotes del gato.

### Pantallas del juego

| Pantalla | Descripción |
|----------|-------------|
| 🎬 **Intro** | GIF animado de bienvenida + botón Comenzar |
| ⚔️ **Juego** | Marcador, 3 puntos de intento, displays de batalla y botones de patita |
| 🎉 **Ganaste** | Imagen del gato victorioso + lluvia de estrellas `✦ 🐾` |
| 😿 **Perdiste** | Imagen del gato derrotado |
| 🐾 **Empate** | Imagen especial cuando terminas con puntaje igualado |

---

## 🎮 Cómo se juega

1. Presiona **Comenzar** en la pantalla de inicio
2. Elige tu patita: **Piedra**, **Papel** o **Tijera**
3. La CPU elige al azar — se revelan ambas patitas con animación
4. Se juegan **3 rondas** en total
5. Al finalizar, el puntaje decide tu destino:

```
Tú > CPU  →  ¡Ganaste! 🎉
Tú < CPU  →  ¡Perdiste! 😿
Tú = CPU  →  ¡Empate!  🐾
```

### Reglas clásicas

```
🪨 Piedra  vence a  ✂️ Tijera
📄 Papel   vence a  🪨 Piedra
✂️ Tijera  vence a  📄 Papel
```

Los empates de ronda individual no suman punto a nadie.

---

## 🚀 Instalación y uso

No requiere servidor ni instalación de dependencias.

```bash
# 1. Clona el repositorio
git clone https://github.com/tu-usuario/piedra-papel-tijera.git

# 2. Entra a la carpeta
cd piedra-papel-tijera

# 3. Descarga las imágenes en assets/img/ (ver tabla más abajo)

# 4. Abre el juego
open index.html      # macOS
start index.html     # Windows
xdg-open index.html  # Linux
```

O simplemente arrastra `index.html` a tu navegador. ¡Listo!

---

## 🖼️ Imágenes requeridas

Las imágenes no están incluidas en el repositorio. Descárgalas y guárdalas en `assets/img/` con exactamente estos nombres:

| Archivo | Pantalla | Fuente |
|---------|----------|--------|
| `intro.gif` | Bienvenida | [Ver imagen](https://i.pinimg.com/originals/ba/e8/f7/bae8f781427e642e5320648a5eab4e14.gif) |
| `ganaste.webp` | Victoria | [Ver imagen](https://i.pinimg.com/webp70/736x/46/7c/1c/467c1c76a780fb830fa855021b7a1cc7.webp) |
| `perdiste.webp` | Derrota | [Ver imagen](https://i.pinimg.com/webp70/1200x/6a/a8/99/6aa899f744d4d616dc2b1d3b38e44995.webp) |
| `empate.webp` | Empate | [Ver imagen](https://i.pinimg.com/webp70/736x/0f/72/7d/0f727dba26eb3c0af486af96abac97a7.webp) |

---

## 📁 Estructura del proyecto

```
piedra-papel-tijera/
│
├── 📄 index.html        ← Estructura HTML y pantallas del juego
├── 🎨 styles.css        ← Estilos, animaciones y paleta de colores
├── ⚙️  script.js         ← Lógica del juego, navegación y efectos
│
├── assets/
│   └── img/
│       ├── intro.gif        ← GIF pantalla de inicio
│       ├── ganaste.webp     ← Imagen victoria
│       ├── perdiste.webp    ← Imagen derrota
│       └── empate.webp      ← Imagen empate
│
└── 📖 README.md
```

---

## 🎨 Paleta de colores

| Muestra | Hex | Uso |
|---------|-----|-----|
| 🟩 | `#001c00` | Fondo principal |
| 🟢 | `#004d3c` | Cards y paneles |
| 🩷 | `#ff65e0` | Acentos principales, bordes activos, texto victoria |
| 💗 | `#ff8ec4` | Labels, almohadillas de patitas |
| 🍑 | `#ffcdab` | Texto secundario, pantalla de empate |

---

## 🧩 Detalles técnicos

- **Patitas SVG** dibujadas a mano: cada opción es un `<svg>` inline con garrita negra `#1a1a1a` y almohadillas rosas `#ff8ec4`, sin imágenes externas
- **Animaciones CSS puras**: `fadeIn`, `shake` (derrota de ronda), `bounce` (victoria de ronda), `starfall` (lluvia de estrellas), `float` (partículas de fondo)
- **Sistema de pantallas**: una sola clase `.active` controla qué pantalla es visible — sin librerías de routing
- **Lógica de resultado**: al agotar los 3 intentos compara `playerScore` vs `cpuScore` y navega a uno de los 3 desenlaces posibles
- **Tipografías**: `Fredoka One` para títulos + `Nunito` para cuerpo, vía Google Fonts

---

## 📜 Licencia

Este proyecto es de uso libre. Puedes modificarlo, compartirlo y mejorarlo como quieras. 🐾

---

<div align="center">
  Hecho con 🩷 y muchas patitas
</div>