import fetch from "node-fetch";
import AbortController from "abort-controller";
import { URL } from "url";
const { WritableStream } = require("htmlparser2/lib/WritableStream");

// Reusing the types from frontend, would be better to share more DRY-ly.
export type Domain = {
  number: number;
  domain: string;
};
export type FaviconDomain = Domain & {
  favicon: string;
};
export type FaviconFailure = Domain & {
  reason: string;
};

const validRel = new Set([
  "shortcut icon",
  "icon",
  "apple-touch-icon",
  "apple-touch-icon-precomposed",
  "SHORTCUT ICON",
  "ICON",
  "APPLE-TOUCH-ICON",
  "APPLE-TOUCH-ICON-PRECOMPOSED"
]);

export const findFavicon = async (domain: Domain): Promise<FaviconDomain> => {
  // We timeout fetch calls that take more than 5 seconds.
  const controller = new AbortController();
  setTimeout(() => {
    controller.abort();
  }, 1000 * 15);

  const expectedFaviconUrl = `http://${domain.domain}/favicon.ico`;
  try {
    const response = await fetch(expectedFaviconUrl, {
      signal: controller.signal
    });
    const responseHeader = response.headers.get("Content-Type");
    if (
      responseHeader?.startsWith("image") ||
      responseHeader === "application/octet-stream"
    ) {
      console.debug("naive found", domain.domain);
      return { ...domain, favicon: expectedFaviconUrl };
    }
  } catch (e) {
    // Let's continue to checking DOM then.
  }

  return new Promise<FaviconDomain>(async (resolve, reject) => {
    const parserStream = new WritableStream({
      onopentag: (_name: any, attributes: any) => {
        if (attributes.href && validRel.has(attributes.rel)) {
          console.debug("found", domain.domain);
          resolve({
            ...domain,
            favicon: new URL(attributes.href, `http://${domain.domain}/`).href
          });
        }
      },
      onend: () => {
        reject(`No favicon found in DOM for ${domain.domain}`);
      }
    });

    try {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 1000 * 10);

      fetch(`http://${domain.domain}/`, {
        signal: controller.signal
      })
        .then((res) => {
          res.body.pipe(parserStream);
        })
        .catch((reason) => reject(reason));
    } catch (e) {
      reject(e);
    }
  });
};
