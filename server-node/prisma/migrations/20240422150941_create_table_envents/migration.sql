-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "slug" TEXT NOT NULL,
    "maximum-attendendaes" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");
