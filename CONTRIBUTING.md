# 🤝 Guía para Contribuir a Porrodoro

¡Gracias por tu interés en contribuir a **Porrodoro**! Este proyecto es de código abierto y todas las contribuciones son bienvenidas.

## 📋 Índice

- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Reportar Issues](#reportar-issues)
- [Sugerir Mejoras](#sugerir-mejoras)
- [Pull Requests](#pull-requests)
- [Guía de Desarrollo](#guía-de-desarrollo)
- [Estilo de Código](#estilo-de-código)

## Código de Conducta

Este proyecto sigue un [Código de Conducta](CODE_OF_CONDUCT.md). Al participar, se espera que mantengas un ambiente respetuoso e inclusivo.

## ¿Cómo puedo contribuir?

### 🐛 Reportar Bugs
1. Usa el template de **Bug Report** al crear un issue
2. Incluye pasos claros para reproducir el error
3. Describe el comportamiento esperado vs. el actual
4. Adjunta capturas de pantalla si es posible
5. Menciona tu sistema operativo y versión de Node.js

### 💡 Sugerir Mejoras
1. Usa el template de **Feature Request**
2. Explica claramente la funcionalidad que te gustaría ver
3. Describe por qué sería útil para otros usuarios
4. Si puedes, esboza cómo podría implementarse

### 🎨 Nuevos Temas
¿Quieres crear un tema nuevo? ¡Genial!
1. Crea un archivo CSS en `src/css/themes/`
2. Sigue la estructura de variables CSS existente
3. Asegúrate de que sea accesible (contraste suficiente)
4. Documenta los colores en el README

### 🌐 Traducciones
Ayúdanos a llegar a más personas traduciendo la interfaz y documentación.

## 🚀 Pull Requests

### Proceso

1. **Fork** el repositorio
2. **Clona** tu fork: `git clone https://github.com/tu-usuario/porrodoro.git`
3. **Crea una rama**: `git checkout -b feature/nombre-de-tu-funcion`
4. **Haz tus cambios**
5. **Ejecuta pruebas**: `npm test`
6. **Commit**: `git commit -m 'Descripción clara del cambio'`
7. **Push**: `git push origin feature/nombre-de-tu-funcion`
8. **Abre un Pull Request** desde tu rama a `main`

### Requisitos

- ✅ El código debe pasar `npm run lint`
- ✅ Los commits deben tener mensajes descriptivos
- ✅ Una rama por funcionalidad/corrección
- ✅ Incluye pruebas cuando sea relevante
- ✅ Actualiza la documentación si es necesario

### Template de PR

```markdown
## Descripción
[Descripción clara de los cambios]

## Tipo de cambio
- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Mejora de rendimiento
- [ ] Documentación
- [ ] Refactorización

## ¿Cómo se ha probado?
[Describe las pruebas realizadas]

## Screenshots (si aplica)
[Adjunta capturas]

## Checklist
- [ ] El código sigue el estilo del proyecto
- [ ] Se han actualizado los archivos de documentación
- [ ] Los tests pasan correctamente
```

## 💻 Guía de Desarrollo

### Entorno Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/porrodoro.git
cd porrodoro

# 2. Instalar dependencias
npm install

# 3. Iniciar en modo desarrollo
npm start

# 4. (Opcional) Servidor web para desarrollo rápido
node dev-server.js
# Abrir http://localhost:3000
```

### Estructura del Proyecto

```
porrodoro/
├── src/                    # Frontend
│   ├── index.html         # HTML principal
│   ├── css/               # Estilos
│   │   ├── style.css      # Estilos base
│   │   └── themes/        # Temas
│   ├── js/                # JavaScript
│   │   └── app.js         # Lógica principal
│   └── assets/            # Recursos
├── main/                  # Electron
│   └── index.js           # Proceso principal
├── package.json
└── README.md
```

## 📐 Estilo de Código

### JavaScript
- Usa `const` y `let` (nunca `var`)
- Nombres descriptivos en camelCase
- Comentarios JSDoc para funciones públicas
- 2 espacios de indentación
- Punto y coma al final de cada línea

### CSS
- Variables CSS para colores y espaciados
- Nombres de clases en kebab-case
- Organización por componentes
- Prefijos de navegador cuando sea necesario

### HTML
- Semántico y accesible
- Atributos `aria-label` en elementos interactivos
- Etiquetas `lang="es"` en el HTML

## 🧪 Pruebas

```bash
# Ejecutar linter
npm run lint

# Ejecutar pruebas (cuando estén disponibles)
npm test
```

## 📝 Convención de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: añadir nuevo tema oscuro
fix: corregir error en el temporizador al pausar
docs: actualizar README con instrucciones
style: formatear código CSS
refactor: reorganizar funciones del temporizador
test: añadir pruebas para el módulo de configuración
chore: actualizar dependencias
```

## ❓ ¿Dudas?

Si tienes preguntas, abre un issue o contacta a los mantenedores.

---

**¡Gracias por contribuir a Porrodoro! 🍅✨**
