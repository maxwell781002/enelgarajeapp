// process.env.POSTGRES_PRISMA_URL =
//   "postgresql://catalog_local_owner:zG3K7etnDZYT@ep-shy-pine-a5ouqatg.us-east-2.aws.neon.tech/catalog_testing?sslmode=require";
// process.env.POSTGRES_URL_NON_POOLING =
//   "postgresql://catalog_local_owner:zG3K7etnDZYT@ep-shy-pine-a5ouqatg.us-east-2.aws.neon.tech/catalog_testing?sslmode=require";

process.env.POSTGRES_PRISMA_URL =
  "postgres://postgres:postgres@localhost:5432/main-test";
process.env.POSTGRES_URL_NON_POOLING =
  "postgres://postgres:postgres@localhost:5432/main-test";

process.env.BOT_WEBHOOK_URL = "";
process.env.CATALOG_BOT_APK_KEY = "apk-test";
