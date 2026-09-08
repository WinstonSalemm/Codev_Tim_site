import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, rename, unlink } from "node:fs/promises";
import { createHash, randomUUID } from "node:crypto";
import path from "node:path";
import { promotionErrors } from "@/lib/commerce/pricing";
export const runtime = "nodejs";
const digest = (s: string) => createHash("sha256").update(s).digest("hex");
let saving = false;
export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== "development")
    return new NextResponse(null, { status: 404 });
  const host = request.headers.get("host") ?? "";
  const origin = request.headers.get("origin");
  let hostname = "";
  try {
    hostname = new URL("http://" + host).hostname;
  } catch {}
  if (
    !["localhost", "127.0.0.1", "[::1]"].includes(hostname) ||
    origin !== "http://" + host
  )
    return NextResponse.json(
      { error: "Сохранение доступно только из локального редактора." },
      { status: 403 }
    );
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return new NextResponse(null, { status: 415 });
  if (Number(request.headers.get("content-length") ?? 0) > 65536)
    return new NextResponse(null, { status: 413 });
  const text = await request.text();
  if (text.length > 65536) return new NextResponse(null, { status: 413 });
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Неверный JSON." }, { status: 400 });
  }
  const errors = promotionErrors(body?.promotions);
  if (errors.length)
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  if (saving)
    return NextResponse.json(
      {
        error: "Сохранение уже выполняется. Повторите через несколько секунд.",
      },
      { status: 409 }
    );
  saving = true;
  const filename = path.join(process.cwd(), "content/commerce/promotions.json");
  const temporary = filename + "." + randomUUID() + ".tmp";
  try {
    const previous = await readFile(filename, "utf8");
    if (body.revision !== digest(previous))
      return NextResponse.json(
        {
          error:
            "Акции изменились в другом окне. Обновите страницу перед редактированием.",
        },
        { status: 409 }
      );
    const content = JSON.stringify(body.promotions, null, 2) + "\n";
    await writeFile(temporary, content, { encoding: "utf8", flag: "wx" });
    await rename(temporary, filename);
    return NextResponse.json(
      { revision: digest(content) },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      { error: "Не удалось сохранить файл. Изменения не подтверждены." },
      { status: 500 }
    );
  } finally {
    saving = false;
    await unlink(temporary).catch(() => {});
  }
}
