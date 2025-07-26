// my-medusa-store/medusa-config.ts
import { loadEnv, defineConfig } from "@medusajs/framework/utils"
import path from "path"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL!,
    redisUrl:
      process.env.REDIS_URL ||
      process.env.EVENTS_REDIS_URL ||
      process.env.CACHE_REDIS_URL!,

    databaseDriverOptions:
      process.env.NODE_ENV !== "development"
        ? {
            connection: { ssl: { rejectUnauthorized: false } },
            pool: {
              min: 0,
              max: 7,
              idleTimeoutMillis: 30000,
              createTimeoutMillis: 300000,
              destroyTimeoutMillis: 50000,
              reapIntervalMillis: 10000,
              createRetryIntervalMillis: 2000,
            },
          }
        : {},

    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },

    workerMode:
      (process.env.MEDUSA_WORKER_MODE as "server" | "worker" | "shared") ||
      "server",
  },

  // only backendUrl needed here—outDir is forced in the JS shim
  admin: {
    backendUrl: process.env.MEDUSA_BACKEND_URL,
  },

  modules: {
    event_bus: {
      resolve: "@medusajs/event-bus-redis",
      options: { redisUrl: process.env.EVENTS_REDIS_URL || process.env.REDIS_URL! },
    },
    file: {
      resolve: "@medusajs/file",
      options: {
        providers: [
          {
            id: "cloudinary",
            resolve: "./src/cloudinary-file-service",
            options: {
              cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
              api_key: process.env.CLOUDINARY_API_KEY,
              api_secret: process.env.CLOUDINARY_API_SECRET,
              secure: true,
            },
          },
        ],
      },
    },
    cache: {
      resolve: "@medusajs/cache-redis",
      options: { redisUrl: process.env.CACHE_REDIS_URL || process.env.REDIS_URL! },
    },
    workflows: {
      resolve: "@medusajs/workflow-engine-redis",
      options: { redis: { url: process.env.REDIS_URL! } },
    },
    notification: {
      resolve: "@medusajs/notification",
      options: {
        providers: [
          {
            id: "slack",
            resolve: "./src/modules/slack",
            options: {
              webhook_url: process.env.SLACK_WEBHOOK_URL,
              admin_url: process.env.SLACK_ADMIN_URL,
              channels: ["slack"],
            },
          },
        ],
      },
    },
    productReview: {
      resolve: "./src/modules/product-review",
    },
  },
})
