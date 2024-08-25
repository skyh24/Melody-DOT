/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Hesin
 * @Date: 2024-08-24 16:06:12
 * @LastEditors: Hesin
 * @LastEditTime: 2024-08-24 16:19:22
 */

function requestHandler(_request: Request): Response {
  return Response.json({ message: "Hello from Next.js!" });
}

export { requestHandler as GET };
