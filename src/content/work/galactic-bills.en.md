---
slug: galactic-bills
lang: en
title: galacticBills
summary: Invoice capture and bookkeeping for small businesses, powered by an LLM — no manual data entry.
role: Design, build and operations
year: '2026'
stack: [n8n, Gemini, Telegram, Google Drive, Google Sheets, AWS EC2]
metrics: []
links: []
draft: true
order: 1
---

> Borrador estructural. El contenido real se escribe en la Fase 3.

## The problem

Small businesses lose hours every month typing invoices into a spreadsheet.

## The system

The client sends a photo or a PDF over a messaging channel. The file lands in
storage, an LLM extracts the tax fields, the totals are checked against each
other, and the row is filed — with a confirmation back on the same channel.

## The hard decision

<!-- TODO: multi-tenant compartido vs. instancia por cliente; el aislamiento
     de datos como línea roja. Ver la nota de tenancy en el vault. -->

## Where it stands

<!-- TODO: estado real, sin sugerir escala que no existe. -->
