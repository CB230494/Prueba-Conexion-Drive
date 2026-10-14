PRUEBA DE CONEXIÓN: GITHUB PAGES + GOOGLE SHEETS
================================================

ARCHIVOS DEL PROYECTO
---------------------
1. index.html
2. style.css
3. app.js
4. Codigo.gs

PASO 1 - GOOGLE SHEETS
----------------------
1. Abra la hoja de Google Sheets.
2. Copie el ID del documento desde la URL.
   Ejemplo:
   https://docs.google.com/spreadsheets/d/1ABC123XYZ/edit
   El ID es:
   1ABC123XYZ

3. En Google Sheets entre a:
   Extensiones > Apps Script

4. Pegue el contenido de Codigo.gs.

5. En esta línea:
   const SPREADSHEET_ID = "PEGAR_AQUI_ID_DE_LA_HOJA";
   coloque el ID real de la hoja.

6. Si la pestaña no se llama "Hoja 1", cambie:
   const SHEET_NAME = "Hoja 1";

7. Ejecute una vez la función:
   inicializarSistema()

8. Autorice los permisos solicitados.

El sistema creará automáticamente estas columnas:
ID | FECHA_REGISTRO | NOMBRE | CEDULA | DELEGACION


PASO 2 - PUBLICAR APPS SCRIPT
-----------------------------
1. En Apps Script:
   Implementar > Nueva implementación

2. Tipo:
   Aplicación web

3. Ejecutar como:
   Yo

4. Quién tiene acceso:
   Cualquiera

5. Implemente y copie la URL que termina en:
   /exec


PASO 3 - CONFIGURAR GITHUB PAGES
--------------------------------
1. Abra app.js.

2. Busque:
   const API_URL = "PEGAR_AQUI_LA_URL_DEL_APPS_SCRIPT";

3. Pegue la URL /exec de Apps Script.

4. Suba a GitHub:
   index.html
   style.css
   app.js

5. Active GitHub Pages desde:
   Settings > Pages


PRUEBA
------
Al abrir la web podrá registrar:
- Nombre
- Cédula
- Delegación

Los datos quedarán guardados en Google Sheets.
