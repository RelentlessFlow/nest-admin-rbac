// 用于配置文件.env生产环境和开发环境的切换处理
import * as fs from "fs";
import * as path from "path";
const isProd = process.env.NODE_ENV === "production";

function parseEnv() {
  const localEnv = path.resolve(".env");
  const prodEnv = path.resolve(".env.prod");

  if (!fs.existsSync(localEnv) && !fs.existsSync(prodEnv)) {
    throw new Error("缺少环境配置文件");
  }

  const filePath = isProd && fs.existsSync(prodEnv) ? prodEnv : localEnv;

  //   const config = dotenv.parse(fs.readFileSync(filePath));

  return { path: filePath };
}

export default parseEnv();
