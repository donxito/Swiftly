import { NextRequest, NextResponse } from "next/server";
import { notFound } from "next/navigation";
import db from "@/db/db";
import fs from "fs/promises";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    select: {
      filePath: true,
      name: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const { size } = await fs.stat(product.filePath);
  const file = await fs.readFile(product.filePath);
  const extension = product.filePath.split(".").pop();

  return new NextResponse(file, {
    headers: {
      "Content-Type": `application/${extension}`,
      "Content-Disposition": `attachment; filename="${product.name}.${extension}"`,
      "Content-Length": size.toString(),
      "Cache-Control": "no-store",
    },
  });
}
