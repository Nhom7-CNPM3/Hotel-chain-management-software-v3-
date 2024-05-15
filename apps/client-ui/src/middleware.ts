import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  let cookie = req.cookies.get("user_id")?.value;
  let userRole = req.cookies.get("role")?.value ?? "defaultRole";
  let roles = ["Admin", "PhucVu", "LeTan"];

  function checkAccess(userRole: string, requestedRole: string): boolean {
    const rolesOrder = ["", "PhucVu", "LeTan", "Admin"];
    const userRoleIndex = rolesOrder.indexOf(userRole);
    const requestedRoleIndex = rolesOrder.indexOf(requestedRole);
    return (
      userRoleIndex >= 0 &&
      requestedRoleIndex >= 0 &&
      userRoleIndex < requestedRoleIndex
    );
  }

  if (!cookie && roles.includes(req.nextUrl.pathname.split("/")[1])) {
    const absoluteURL = new URL("/warning", req.nextUrl.origin);
    return NextResponse.rewrite(absoluteURL.toString());
  }

  if (cookie && checkAccess(userRole, req.nextUrl.pathname.split("/")[1])) {
    const absoluteURL = new URL("/warning", req.nextUrl.origin);
    return NextResponse.rewrite(absoluteURL.toString());
  }
}
