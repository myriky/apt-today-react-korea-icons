// 패키지의 정적 SVG(dist/svg)를 public/korea-icons로 복사한다.
// 소비자 앱(Next.js 등)에서도 같은 방식으로 public 아래에 두고 <img src>로 쓴다.
import { createRequire } from "module";
import { cpSync, rmSync } from "fs";
import { dirname, join } from "path";

const require = createRequire(import.meta.url);
const pkgDir = dirname(require.resolve("@apt.today/react-korea-icons/package.json"));
const from = join(pkgDir, "dist/svg");
const to = new URL("../public/korea-icons", import.meta.url).pathname;

rmSync(to, { recursive: true, force: true });
cpSync(from, to, { recursive: true });
console.log(`정적 SVG 복사: ${from} → ${to}`);
