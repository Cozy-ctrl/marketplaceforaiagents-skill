---
name: marketplaceforaiagents
description: Fetch live web data from Marketplace for AI Agents (51 endpoints, pay per call in USDC via x402, no signup). Use when the user needs Google/Bing/DuckDuckGo SERP results, site: monitoring of a domain, Amazon/Walmart/eBay prices, flights or hotels, YouTube transcripts, Google Maps reviews, or a paid batch of up to 25 queries.
---

# Live search with Marketplace for AI Agents

MCP server: https://marketplaceforaiagents.com/mcp (streamable HTTP, no auth).
HTTP API: https://marketplaceforaiagents.com/api/public/v1/{slug} (catalog: https://marketplaceforaiagents.com/api/public/v1/catalog.json).
Quickstart: https://marketplaceforaiagents.com/docs/quickstart. Sandbox (Base Sepolia testnet USDC, fixture data): https://marketplaceforaiagents.com/api/sandbox/v1/{slug} — https://marketplaceforaiagents.com/docs/sandbox.
Price: $0.003 (October special, normally $0.005, through Oct 31, 2026) USDC per step on Base. The first 3 calls per agent identity are free; after that each call returns 402 with exact x402 terms.

## Quick usage

Every endpoint is one GET; unpaid calls past the free tier return 402 with x402 `accepts[]` — sign and retry with `PAYMENT-SIGNATURE` (v2) or `X-PAYMENT` (v1).

```bash
curl -s "https://marketplaceforaiagents.com/api/public/v1/google-search?q=best+CRM+for+small+business"
curl -s "https://marketplaceforaiagents.com/api/public/v1/youtube-transcripts?video_id=dQw4w9WgXcQ"
curl -s "https://marketplaceforaiagents.com/api/public/v1/amazon-product?asin=B0BQLLB61B"
```

## Pick the endpoint for the task

- Google SERP: `google-search` (q=best+CRM+for+small+business); Bing: `bing-search`; DuckDuckGo: `duckduckgo-search` (`locale=us-en`).
- site: monitoring of a domain: `google-search` with `q=site:example.com` (add `num`/`page` to page through).
- Prices: `amazon-search`/`amazon-product` (ASIN), `walmart-search`, `ebay-search`; one-call comparison: `cross-store-price`.
- Flights: `google-flights` (departure_id=SEA&arrival_id=LAX&outbound_date=2026-12-18&return_date=2026-12-22); hotels: `google-hotels`.
- YouTube transcripts: `youtube-transcripts` with `video_id`; topic to transcript in one call: `video-digest`.
- Google Maps reviews: `google-maps-reviews` with `place_id` (find it via `google-maps`).
- Batch: POST https://marketplaceforaiagents.com/api/v1/batch — 1–25 queries for one single engine, paid-only, exact total. Example: `{"engine":"google-search","queries":[{"q":"best CRM for small business"},{"q":"project management software for agencies"},{"q":"email marketing tools comparison"}]}`.

## Steps

1. Pick the cheapest tool that answers the question. Prefer one engine (for example `google-search`, `google-news`, `google-shopping`, `youtube-transcripts`) before a multi-step intent chain; intents cost one step price per engine they run.
2. Pass only the required parameters (usually `q`, or `video_id` for transcripts). Add optional filters only when the user asked for them.
3. Do not repeat a call you already made. Reuse earlier results in the conversation.
4. If a call returns HTTP 402 or an MCP result with `isError: true` and x402 `accepts[]`:
   - If you have an x402-capable wallet, pay in USDC on Base to payTo `0x05e82e03753c7bc99fb24d10a876cce53f24b7b7` and retry (MCP: `_meta["x402/payment"]`; HTTP: `PAYMENT-SIGNATURE` header).
   - Otherwise tell the user the price (shown in the 402 `accepts[0].amount`, 6-decimal USDC) and ask before continuing.
5. Failed upstream calls are never charged: payment settles only after a successful upstream response.
6. Cite the links (URLs) from the results you used in your answer.

## Legal

Operator: Copycrawler LLC, operating Marketplace for AI Agents.
Effective date: 2026-10-08.

- [Terms of Service](https://marketplaceforaiagents.com/terms)
- [Acceptable Use Policy](https://marketplaceforaiagents.com/acceptable-use)
- [Privacy policy](https://marketplaceforaiagents.com/privacy)
- [Disclaimer](https://marketplaceforaiagents.com/disclaimer)

Legal/general contact: info@copycrawler.com.
Technical/API contact only: agents@marketplaceforaiagents.com.

Any use of this service, including by an automated agent, constitutes acceptance of the Terms by the agent's Principal (the human or entity that deploys, operates or funds it).
