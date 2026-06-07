"use client";

import { useEffect, useMemo, useRef } from "react";
import { normalizeCalLink } from "@/lib/booking";

type CalQueueItem = unknown[];
type CalNamespaceApi = ((...args: unknown[]) => void) & {
  q?: CalQueueItem[];
};
type CalApi = ((...args: unknown[]) => void) & {
  q?: CalQueueItem[];
  ns?: Record<string, CalNamespaceApi>;
  loaded?: boolean;
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

const CAL_EMBED_URL = "https://cal.com/embed.js";

function ensureCalApi(): CalApi {
  (function bootCal(C: Window, A: string, L: string) {
    const push = (
      api: CalApi | CalNamespaceApi,
      args: IArguments | unknown[]
    ) => {
      const queueArgs = Array.from(args as IArguments);
      api.q = api.q || [];
      api.q.push(queueArgs);
    };

    const doc = C.document;
    C.Cal =
      C.Cal ||
      (function calBootstrap(...args: unknown[]) {
        const cal = C.Cal as CalApi;

        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          const script = doc.createElement("script");
          script.src = A;
          script.async = true;
          doc.head.appendChild(script);
          cal.loaded = true;
        }

        if (args[0] === L) {
          const nsApi = (function namespacedApi(...innerArgs: unknown[]) {
            push(nsApi, innerArgs);
          }) as CalNamespaceApi;

          const namespace = args[1];
          nsApi.q = nsApi.q || [];

          if (typeof namespace === "string") {
            cal.ns = cal.ns || {};
            cal.ns[namespace] = cal.ns[namespace] || nsApi;
            push(cal.ns[namespace], args);
            push(cal, ["initNamespace", namespace]);
          } else {
            push(cal, args);
          }
          return;
        }

        push(cal, args);
      } as CalApi);
  })(window, CAL_EMBED_URL, "init");

  return window.Cal as CalApi;
}

function getNamespace(calLink: string): string {
  const normalized = normalizeCalLink(calLink);
  return `lunaire-${normalized.replace(/[^a-zA-Z0-9-_]/g, "-").toLowerCase()}`;
}

type CalInlineEmbedProps = {
  calLink: string;
  className?: string;
};

export function CalInlineEmbed({ calLink, className }: CalInlineEmbedProps) {
  const embedRef = useRef<HTMLDivElement | null>(null);
  const normalizedCalLink = useMemo(() => normalizeCalLink(calLink), [calLink]);
  const namespace = useMemo(() => getNamespace(calLink), [calLink]);

  useEffect(() => {
    const cal = ensureCalApi();
    const element = embedRef.current;
    if (!element) return;

    element.innerHTML = "";

    cal("init", namespace, { origin: "https://cal.com" });
    cal.ns?.[namespace]?.("inline", {
      elementOrSelector: element,
      calLink: normalizedCalLink,
    });
    cal.ns?.[namespace]?.("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, [namespace, normalizedCalLink]);

  return <div ref={embedRef} className={className ?? "min-h-[760px]"} />;
}
