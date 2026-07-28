---
slug: galactic-bills
lang: en
title: galacticBills
summary: Invoice capture and bookkeeping for small businesses, powered by an LLM — no manual data entry.
role: Design, build and operations
year: '2026'
stack: [n8n, Gemini, Telegram, Google Drive, Google Sheets, AWS EC2, Docker]
metrics:
  - { value: '12', label: 'Fields extracted per invoice' }
  - { value: '60s', label: 'From upload to filed row' }
  - { value: '0', label: 'Silent failures after the audit' }
  - { value: '1', label: 'Client running in production' }
links: []
draft: false
order: 1
---

## The problem

A small business loses hours every month typing invoices into a spreadsheet. It is the
kind of work nobody wants and everybody postpones, so it piles up until the accountant
asks for it.

The obvious answer is OCR. The real answer is not: an invoice is not a form. Every
supplier lays it out differently, half of them are photographed at an angle, and the
numbers that matter — taxable base, VAT rate, VAT amount, total — have to be
*consistent with each other* or the row is worse than useless. A wrong number filed
silently costs more than no number at all.

## The system

The client sends a photo or a PDF to a Telegram bot, or drops it into a shared Drive
folder. From there it runs on its own:

1. The file is stored and the pipeline picks it up within a minute
2. A classifier decides whether this is actually an invoice — a blurry photo of
   something else gets rejected here instead of polluting the books
3. Gemini extracts the fiscal fields against a fixed schema, at temperature 0, with a
   strict JSON response type
4. The arithmetic is checked: base plus VAT has to equal the total
5. Anything failing a check goes to a human review queue over Telegram, not to the
   spreadsheet
6. Clean rows are filed, deduplicated by file hash, and confirmed back on the same
   channel the client used

It runs on self-hosted n8n — AWS EC2, Docker Compose, nginx — infrastructure I manage
myself.

## What I got wrong the first time

The first version worked, and that was the problem. I audited my own workflow before
selling it, and the findings were uncomfortable.

**It failed in silence.** No error workflow, no try/catch around the model's output. If
Gemini returned something that was not valid JSON, or the spreadsheet rejected the row,
the invoice simply vanished. The client would never know. That is the worst possible
failure mode for bookkeeping — worse than crashing, because nobody investigates a crash
that never happened.

**Deduplication was fake.** When an invoice had no number, the system generated a
timestamp as its identifier. Upload the same invoice twice and you got two rows with
two different timestamps, and the match-by-id logic saw two different invoices. The
deduplication key is now a hash of the file itself.

**Nothing validated the numbers.** The model's output went straight to the sheet. It now
has to survive an arithmetic check first, and takes a review path if it does not.

**It accepted anything.** Any file dropped into the folder was processed as an invoice,
and the model would confabulate fields for a receipt, a contract, or somebody's cat.

None of these were features. All of them were the difference between a script that works
on my machine and something a business can rely on.

## The hard decision: one installation, or one per client

The interesting problem was never extraction. It was how to serve the same product to
many clients.

The tempting path is to clone the workflow per client and edit the hardcoded values. It
works for the second client and collapses by the fifth: every fix has to be applied by
hand, N times, and the copies drift until nobody knows which client is running what.

The alternative is a shared installation with a configuration layer — each client is a
row: their tax id, their channel, their folder, their chart of accounts, their currency.
One workflow, N configurations.

The trade-off is not developer convenience. **Data isolation is the line that cannot be
crossed:** one business's invoices must never surface in another's books. A shared
installation makes that a property you have to actively enforce. Separate installations
make it true by construction, at the cost of operational load that grows with every sale.

Where that line sits depends on who the clients are, not on which architecture reads
better. The decision is documented and still open — which is the honest state of a
product with one pilot running and a second one being scoped.

## Where it stands

One client in production, processing real invoices. The pipeline is hardened: every
finding above is fixed and verified end to end.

The multi-tenant layer is the next phase, and it is deliberately not built yet. Building
it before knowing how the second client actually differs from the first is how you end
up with configuration options nobody asked for.
