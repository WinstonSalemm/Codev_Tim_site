"use client";

import { useState } from "react";

type CodeBlockCopyButtonProps = {
  code: string;
  copyLabel: string;
  copiedLabel: string;
};

export function CodeBlockCopyButton({
  code,
  copyLabel,
  copiedLabel,
}: CodeBlockCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      className="ds-mdx-codeblock-copy"
      onClick={handleCopy}
      aria-label={copied ? copiedLabel : copyLabel}
    >
      {copied ? copiedLabel : copyLabel}
    </button>
  );
}
