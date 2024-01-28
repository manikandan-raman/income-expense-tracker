import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const req = await request.json();

  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}
