---
slug: galactic-bills
lang: es
title: galacticBills
summary: Captura y contabilización de facturas para negocios pequeños con un LLM — sin digitación manual.
role: Diseño, construcción y operación
year: '2026'
stack: [n8n, Gemini, Telegram, Google Drive, Google Sheets, AWS EC2]
metrics: []
links: []
draft: true
order: 1
---

> Borrador estructural. El contenido real se escribe en la Fase 3.

## El problema

Un negocio pequeño pierde horas cada mes pasando facturas a una hoja de cálculo.

## El sistema

El cliente manda una foto o un PDF por mensajería. El archivo queda guardado,
un LLM extrae los campos fiscales, se valida que los totales cuadren entre sí
y se archiva la fila — con confirmación de vuelta por el mismo canal.

## La decisión difícil

<!-- TODO: multi-tenant compartido vs. instancia por cliente; el aislamiento
     de datos como línea roja. Ver la nota de tenancy en el vault. -->

## Estado actual

<!-- TODO: estado real, sin sugerir escala que no existe. -->
