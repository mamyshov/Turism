import Anthropic from "@anthropic-ai/sdk";

// Lazily constructed so a missing ANTHROPIC_API_KEY only breaks the AI
// routes that need it, not the whole app (build, other API routes, etc).
// The client resolves credentials from ANTHROPIC_API_KEY automatically —
// never call this from client components, and never forward the key to
// the browser.
let client: Anthropic | null = null;

export function getAnthropicClient(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }
  if (!client) {
    client = new Anthropic();
  }
  return client;
}

export const AI_MODEL = "claude-opus-5";
