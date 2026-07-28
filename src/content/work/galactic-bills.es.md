---
slug: galactic-bills
lang: es
title: galacticBills
summary: Captura y contabilización de facturas para negocios pequeños con un LLM — sin digitación manual.
role: Diseño, construcción y operación
year: '2026'
stack: [n8n, Gemini, Telegram, Google Drive, Google Sheets, AWS EC2, Docker]
metrics:
  - { value: '12', label: 'Campos extraídos por factura' }
  - { value: '60s', label: 'Del envío a la fila archivada' }
  - { value: '0', label: 'Fallos silenciosos tras la auditoría' }
  - { value: '1', label: 'Cliente en producción' }
links: []
draft: false
order: 1
---

## El problema

Un negocio pequeño pierde horas cada mes pasando facturas a una hoja de cálculo. Es el
tipo de trabajo que nadie quiere y todo el mundo aplaza, así que se acumula hasta que
el contador lo pide.

La respuesta obvia es OCR. La real no lo es: una factura no es un formulario. Cada
proveedor la maqueta distinto, la mitad llegan fotografiadas en ángulo, y los números
que importan — base imponible, porcentaje de IVA, valor del IVA, total — tienen que ser
*coherentes entre sí* o la fila es peor que inútil. Un número equivocado archivado en
silencio cuesta más que no tener ningún número.

## El sistema

El cliente manda una foto o un PDF a un bot de Telegram, o lo deja en una carpeta
compartida de Drive. A partir de ahí funciona solo:

1. El archivo queda guardado y el pipeline lo recoge en menos de un minuto
2. Un clasificador decide si esto es realmente una factura — una foto borrosa de otra
   cosa se rechaza aquí, en vez de contaminar la contabilidad
3. Gemini extrae los campos fiscales contra un esquema fijo, a temperatura 0 y con tipo
   de respuesta JSON estricto
4. Se comprueba la aritmética: base más IVA tiene que dar el total
5. Todo lo que no pasa una comprobación va a una cola de revisión humana por Telegram,
   no a la hoja
6. Las filas limpias se archivan, deduplicadas por hash del archivo, y se confirman de
   vuelta por el mismo canal que usó el cliente

Corre sobre n8n self-hosted — AWS EC2, Docker Compose, nginx — infraestructura que
gestiono yo.

## Lo que hice mal la primera vez

La primera versión funcionaba, y ese era el problema. Audité mi propio workflow antes de
venderlo, y los hallazgos fueron incómodos.

**Fallaba en silencio.** Sin workflow de error, sin try/catch alrededor de la salida del
modelo. Si Gemini devolvía algo que no era JSON válido, o la hoja rechazaba la fila, la
factura simplemente desaparecía. El cliente nunca se enteraba. Es el peor modo de fallo
posible para una contabilidad — peor que romperse, porque nadie investiga una caída que
nunca ocurrió.

**La deduplicación era falsa.** Cuando una factura no tenía número, el sistema generaba
un timestamp como identificador. Sube la misma factura dos veces y obtenías dos filas
con timestamps distintos, y la lógica de "cruzar por id" veía dos facturas diferentes.
Ahora la clave de deduplicación es un hash del propio archivo.

**Nada validaba los números.** La salida del modelo iba directa a la hoja. Ahora tiene
que sobrevivir primero a una comprobación aritmética, y si no lo hace toma la ruta de
revisión.

**Aceptaba cualquier cosa.** Cualquier archivo que cayera en la carpeta se procesaba
como factura, y el modelo inventaba campos para un recibo, un contrato o el gato de
alguien.

Ninguna de estas era una funcionalidad. Todas eran la diferencia entre un script que
funciona en mi máquina y algo de lo que un negocio puede depender.

## La decisión difícil: una instalación, o una por cliente

El problema interesante nunca fue la extracción. Fue cómo servir el mismo producto a
varios clientes.

El camino tentador es clonar el workflow por cliente y editar los valores fijos.
Funciona para el segundo cliente y se derrumba en el quinto: cada corrección hay que
aplicarla a mano, N veces, y las copias se separan hasta que nadie sabe qué versión
tiene cada cliente.

La alternativa es una instalación compartida con una capa de configuración — cada
cliente es una fila: su NIF, su canal, su carpeta, su plan contable, su moneda. Un
workflow, N configuraciones.

El trade-off no es la comodidad del desarrollador. **El aislamiento de datos es la línea
que no se cruza:** las facturas de un negocio jamás pueden aparecer en la contabilidad de
otro. Una instalación compartida convierte eso en una propiedad que hay que hacer
cumplir activamente. Instalaciones separadas lo hacen cierto por construcción, a cambio
de una carga operativa que crece con cada venta.

Dónde está esa línea depende de quiénes sean los clientes, no de qué arquitectura suena
mejor. La decisión está documentada y sigue abierta — que es el estado honesto de un
producto con un piloto corriendo y un segundo en preparación.

## Estado actual

Un cliente en producción, procesando facturas reales. El pipeline está blindado: cada
hallazgo de arriba está corregido y verificado de punta a punta.

La capa multi-tenant es la siguiente fase, y deliberadamente todavía no está construida.
Construirla antes de saber en qué se diferencia de verdad el segundo cliente del primero
es la forma de acabar con opciones de configuración que nadie pidió.
