/*
  Warnings:

  - Added the required column `name` to the `social_links` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "social_links" ADD COLUMN     "name" TEXT NOT NULL;
